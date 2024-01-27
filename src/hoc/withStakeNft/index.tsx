import React, { ComponentType, useEffect, useMemo, useState } from "react";
import { AppConstant, EnvConstant, LangConstant } from "const";
import { useTranslation } from "react-i18next";
import { NFTClass } from "models";
import { useAuthContext, useGlobalModalContext } from "context";
import { useTransaction } from "hooks";
import { InventoryService } from "services";
import { AppSnackbar, AppTransactionProgressModal } from "components/common";
import { BlockchainUtils } from "utils";
import { MODAL_TYPES } from "context/GlobalModalContext";
import { createStakeOder } from "./helper";

function withStakeNftController<T>(StakeNftCardStarter: ComponentType<T>) {
  const WithStakeNftComponent = (props: T) => {
    const { t: getLabel } = useTranslation();
    const { t: getLabelInventory } = useTranslation(LangConstant.NS_INVENTORY);
    const { walletAddress } = useAuthContext();
    const { showGlobalModal, closeGlobalModal } = useGlobalModalContext();

    const {
      transactionStatus,
      transactionHash,
      transactionData,
      errorCode,
      errorMessage,
      handleResetTransactionState,
      handleSendTransaction,
    } = useTransaction();

    const [isOpenProgressModal, setIsOpenProgressModal] = useState(false);
    const [labelButton, setLabelButton] = useState("");
    const [isStaking, setIsStaking] = useState(false);
    const [transactionStep, setTransactionStep] = useState(
      POLYGON_NFT_TRANSACTION_STEP.approveToken,
    );
    const [nftData, setNftData] = useState(new NFTClass({}));
    const [isOpenSnackBar, setIsOpenSnackbar] = useState(false);
    const [snackbarStatus, setSnackbarStatus] = useState(AppConstant.SNACKBAR_STATUS.success);
    const [messageSnackBar, setMessageSnackBar] = useState("");

    const stakeCardStatus = useMemo(() => {
      if (!transactionStatus) return;
      return BlockchainUtils.getTransactionStepStatus(
        transactionStatus,
        transactionStep,
        POLYGON_NFT_TRANSACTION_STEP,
        errorCode,
      );
    }, [transactionStatus, transactionStep, errorCode]);

    const handleClickStake = (data: NFTClass) => {
      setNftData(data);
      setIsOpenProgressModal(true);
      setIsStaking(true);
      handleResetTransactionState();
      handleCheckCardCondition(data);
    };

    const handleCheckCardCondition = async (data: NFTClass) => {
      const isApproveCard = await InventoryService.checkIsNftApproveForAll(
        EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_STAKING_CARD,
        walletAddress,
      );

      if (isApproveCard) {
        handleStakeCard(data);
      } else {
        handleApprove();
      }
    };

    const handleStakeCard = async (data: NFTClass) => {
      setTransactionStep(POLYGON_NFT_TRANSACTION_STEP.sendTransaction);
      setLabelButton(getLabel("lOk"));
      handleResetTransactionState();

      const { itemClass, tokenId } = data.item;
      const orderData = await createStakeOder(itemClass, tokenId, 1);
      const { id, gameSignature } = orderData;

      if (gameSignature) {
        const stakingNFTCardTransactionData = await InventoryService.createStakingCardTransaction(
          id,
          tokenId,
          gameSignature,
          walletAddress,
        );

        await handleSendTransaction(walletAddress, stakingNFTCardTransactionData);
      } else {
        setIsOpenProgressModal(false);
        setIsOpenSnackbar(true);
        setSnackbarStatus(AppConstant.SNACKBAR_STATUS.error);
        setIsStaking(false);
        // TOTO: update when API deploy
        setMessageSnackBar(getLabel("msgError"));
      }
    };

    const handleApprove = async () => {
      setIsOpenProgressModal(true);
      setLabelButton(getLabel("lContinue"));
      setTransactionStep(POLYGON_NFT_TRANSACTION_STEP.approveToken);
      const approveCardData = await InventoryService.createApproveInventoryTransactionData(
        EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_NFT_CARD,
        EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_STAKING_CARD,
        walletAddress,
      );
      await handleSendTransaction(walletAddress, approveCardData);
    };

    const handleCloseAppTransactionProgressModal = () => {
      handleResetTransactionState();
      setIsOpenProgressModal(false);
    };

    const handleCloseAppSnackbar = () => {
      handleResetTransactionState();
      setIsOpenSnackbar(false);
    };

    const handleNoticeProcessing = () => {
      showGlobalModal(MODAL_TYPES.noticeModal, {
        modalTitleProps: { title: getLabel("objLoadingStatus.lProcessing") },
        modalContentProps: {
          content: getLabel("msgCancelListing"),
        },
        onSubmit: closeGlobalModal,
      });
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
        nftData.itemClass &&
        transactionStep === POLYGON_NFT_TRANSACTION_STEP.sendTransaction
      ) {
        // Todo Update when implement API
        setIsOpenSnackbar(false);
        setIsOpenProgressModal(false);
        handleNoticeProcessing();
      }
    }, [transactionData, transactionHash, nftData.itemClass, transactionStep]);

    return (
      <>
        <StakeNftCardStarter onStakeStartCard={handleClickStake} isStake={isStaking} {...props} />
        <AppTransactionProgressModal
          onClick={() => setIsOpenProgressModal(false)}
          onContinue={() => handleStakeCard(nftData)}
          open={isOpenProgressModal}
          onClose={handleCloseAppTransactionProgressModal}
          startStep={transactionStep}
          transactionStatus={stakeCardStatus}
          transactionHash={transactionHash}
          transactionSteps={getDefaultTransactionSteps()}
          buttonProps={{ label: labelButton }}
          modalTitleProps={{ title: getLabelInventory("lStakeBox") }}
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
  return WithStakeNftComponent;
}

export interface StakeNftControllerProps {
  onStakeStartCard: (data: NFTClass) => void;
  isStake: boolean;
}

export default withStakeNftController;

export const getDefaultTransactionSteps = () => {
  const { t: getLabel } = useTranslation();
  const { t: getLabelInventory } = useTranslation(LangConstant.NS_INVENTORY);

  return [
    {
      label: getLabel("lApprove"),
      description: getLabel("msgApprove"),
    },
    {
      label: getLabelInventory("lStakeBox"),
      description: getLabelInventory("msgStake"),
    },
  ];
};

const POLYGON_NFT_TRANSACTION_STEP = {
  [AppConstant.TRANSACTION_STEP.approveToken]: 1,
  [AppConstant.TRANSACTION_STEP.sendTransaction]: 2,
};
