import React, { ComponentType, useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { AppSnackbar, AppTransactionProgressModal } from "components/common";
import { SellInputModal } from "components/sn-inventory";
import { AppConstant, EnvConstant, LangConstant } from "const";
import { NFTClass } from "models";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "context";
import { InventoryService } from "services";
import { useTransaction } from "hooks";
import { BlockchainUtils } from "utils";

const withSellNftController = (SellStarterComponent: ComponentType<SellNftControllerProps>) => {
  const withSellNftComponent = () => {
    const { t: getLabel } = useTranslation();
    const { t: getLabelInventory } = useTranslation(LangConstant.NS_INVENTORY);
    const { walletAddress } = useAuthContext();
    const {
      transactionStatus,
      transactionHash,
      transactionData,
      errorCode,
      errorMessage,
      handleResetTransactionState,
      handleSendTransaction,
    } = useTransaction();

    const [nftData, setNftData] = useState(new NFTClass({}));
    const [modalTitle, setModalTitle] = useState("");
    const [isOpenModalSell, setIsOpenModalSell] = useState(false);
    const [isOpenProgressModal, setIsOpenProgressModal] = useState(false);
    const [totalPrice, setTotalPrice] = useState("");
    const [label, setLabel] = useState<string>(getLabel("lContinue"));
    const [stepSellCard, setStepSellCard] = useState(POLYGON_NFT_TRANSACTION_STEP.approveInventory);
    const [isOpenSnackBar, setIsOpenSnackbar] = useState(false);
    const [snackbarStatus, setSnackbarStatus] = useState(AppConstant.SNACKBAR_STATUS.success);
    const [messageSnackBar, setMessageSnackBar] = useState("");

    const sellCardStatus = useMemo(() => {
      if (!transactionStatus) return;
      return BlockchainUtils.getTransactionStepStatus(
        transactionStatus,
        stepSellCard,
        POLYGON_NFT_TRANSACTION_STEP,
        errorCode,
      );
    }, [transactionStatus, stepSellCard, errorCode]);

    const handleSellCard = async () => {
      setStepSellCard(POLYGON_NFT_TRANSACTION_STEP.sendTransaction);
      setLabel(getLabel("lOk"));
      setIsOpenProgressModal(true);

      if (nftData) {
        const nftId = nftData.tokenId;

        const sellCardData = await InventoryService.createListingCardTransactionData(
          nftId,
          totalPrice,
          walletAddress,
        );
        await handleSendTransaction(walletAddress, sellCardData);
      }
    };

    const handleApprove = async () => {
      setIsOpenProgressModal(true);
      setLabel(getLabel("lContinue"));

      const approveCardData = await InventoryService.createApproveInventoryTransactionData(
        EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_NFT_CARD,
        EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_NFT_CARD_MARKETPLACE,
        walletAddress,
      );
      await handleSendTransaction(walletAddress, approveCardData);
    };

    const handleCheckSellCardCondition = async () => {
      const isApproveCard = await InventoryService.checkIsNftApproveForAll(
        EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_NFT_CARD_MARKETPLACE,
        walletAddress,
      );
      if (isApproveCard) {
        handleSellCard();
      } else {
        handleApprove();
      }
    };

    const handleSellNft = async (totalPrice: string) => {
      setTotalPrice(totalPrice);
      handleCheckSellCardCondition();
      setIsOpenModalSell(false);
    };

    const handleClickContinue = () => {
      handleResetTransactionState();
      handleSellCard();
    };

    const handleOpenSellInputModal = (data: NFTClass, titleModal: string) => {
      setNftData(data);
      setModalTitle(titleModal);
      setIsOpenModalSell(true);
      setTotalPrice("");
      handleResetTransactionState();
    };

    const handleCloseAppTransactionProgressModal = () => {
      handleResetTransactionState();
      setIsOpenProgressModal(false);
    };

    const handleCloseAppSnackbar = () => {
      handleResetTransactionState();
      setIsOpenSnackbar(false);
    };

    useEffect(() => {
      if (errorMessage) {
        setIsOpenSnackbar(true);
        setSnackbarStatus(AppConstant.SNACKBAR_STATUS.error);
        setMessageSnackBar(errorMessage);
      } else {
        if (transactionData?.status === AppConstant.TRANSACTION_STATUS_TYPE.complete) {
          setIsOpenSnackbar(true);
          setSnackbarStatus(AppConstant.SNACKBAR_STATUS.success);
          setMessageSnackBar(getLabel("msgSuccess"));
        } else {
          return;
        }
      }
    }, [errorMessage, transactionData]);

    useEffect(() => {
      if (
        transactionData?.status === AppConstant.TRANSACTION_STATUS_TYPE.complete &&
        transactionHash &&
        nftData.itemClass
      ) {
        InventoryService.postSellNftDetail(nftData.itemClass, transactionHash);
      }
    }, [transactionData, transactionHash, nftData.itemClass]);

    return (
      <>
        <SellStarterComponent onStartSellCard={handleOpenSellInputModal} />
        <SellInputModal
          onSellNft={handleSellNft}
          labelNft={nftData.getDisplaySellerAddress()}
          nftType={nftData.displayName}
          averagePrice={nftData.getAveragePriceWithToken()}
          highestPrice={nftData.getHighestPriceWithToken()}
          imageNft={<Box component="img" width={44} height={44} src={nftData?.iconUrl} />}
          modalTitleProps={{ title: modalTitle }}
          open={isOpenModalSell}
          onClose={() => setIsOpenModalSell(false)}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
        />
        <AppTransactionProgressModal
          onClick={() => setIsOpenProgressModal(false)}
          onContinue={handleClickContinue}
          open={isOpenProgressModal}
          onClose={handleCloseAppTransactionProgressModal}
          startStep={stepSellCard}
          transactionStatus={sellCardStatus}
          transactionHash={transactionHash}
          transactionSteps={transactionSteps(modalTitle, getLabelInventory("msgSellCard"))}
          buttonProps={{ label }}
          modalTitleProps={{ title: modalTitle }}
        />
        <AppSnackbar
          contentProps={{ message: messageSnackBar }}
          open={isOpenSnackBar}
          status={snackbarStatus}
          onClose={handleCloseAppSnackbar}
        />
      </>
    );
  };
  return withSellNftComponent;
};

export default withSellNftController;

export interface SellNftControllerProps {
  onStartSellCard: (data: NFTClass, titleModal: string) => void;
}

export const transactionSteps = (stepEnd: string, msgBuyBox: string) => {
  const { t: getLabel } = useTranslation();
  return [
    {
      label: getLabel("lApprove"),
      description: getLabel("msgApprove"),
    },
    {
      label: stepEnd,
      description: msgBuyBox,
    },
  ];
};

const POLYGON_NFT_TRANSACTION_STEP = {
  [AppConstant.TRANSACTION_STEP.approveInventory]: 1,
  [AppConstant.TRANSACTION_STEP.sendTransaction]: 2,
};
