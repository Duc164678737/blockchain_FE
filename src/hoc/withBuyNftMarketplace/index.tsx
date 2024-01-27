import React, { ComponentType, useEffect, useMemo, useState } from "react";
import { AppTrans, AppTransactionProgressModal } from "components/common";
import { AppConstant, EnvConstant } from "const";
import { MarketplaceService } from "services";
import { BuyCardModal } from "components/sn-marketplace";
import { useTranslation } from "react-i18next";
import { NFTClass } from "models";
import { ObjectMultiLanguageProps } from "models/types";
import { useAuthContext, useGlobalModalContext } from "context";
import { BlockchainUtils, FormatUtils } from "utils";
import { MODAL_TYPES } from "context/GlobalModalContext";
import { useTransaction } from "hooks";
import { getMarketplaceContractAddressFromNftType } from "utils/common.utils";

function withBuyNftMarketplaceController<T>(BuyNFTMarketplaceCardStarter: ComponentType<T>) {
  const WithBuyNFTMarketplaceComponent = (props: T) => {
    const { t: getLabel } = useTranslation();
    const { isWalletConnected, walletAddress } = useAuthContext();
    const { showGlobalModal, closeGlobalModal } = useGlobalModalContext();
    const objBuyNftContent: ObjectMultiLanguageProps = getLabel("objBuyNft", {
      returnObjects: true,
    });
    const {
      transactionStatus,
      transactionHash,
      transactionData,
      errorCode,
      handleResetTransactionState,
      handleSendTransaction,
    } = useTransaction();

    const [isOpenModalBuy, setIsOpenModalBuy] = useState(false);
    const [isOpenTransactionModal, setIsOpenTransactionModal] = useState(false);
    const [label, setLabel] = useState("");
    const [step, setStep] = useState(POLYGON_NFT_TRANSACTION_STEP.approveToken);
    const [nftData, setNftData] = useState(new NFTClass({}));
    const [nftContractAddress, setNFTContractAddress] = useState("");

    const handleOpenBuyModal = (data: NFTClass) => {
      const buyNftContractAddress = getMarketplaceContractAddressFromNftType(data.itemClass);
      if (buyNftContractAddress) {
        setNftData(data);
        setNFTContractAddress(buyNftContractAddress);
        setIsOpenModalBuy(true);
        handleResetTransactionState();
      }
    };

    const buyCardStatus = useMemo(() => {
      if (!transactionStatus) return "";
      return BlockchainUtils.getTransactionStepStatus(
        transactionStatus,
        step,
        POLYGON_NFT_TRANSACTION_STEP,
        errorCode,
      );
    }, [transactionStatus, step, errorCode]);

    const handleCheckBuyCondition = async () => {
      if (isWalletConnected) {
        const toyBalance = (await MarketplaceService.getToyBalance(walletAddress)) as number;
        if (toyBalance > nftData.price) {
          handleCheckApproveToken();
        } else {
          setIsOpenModalBuy(false);
          handleNoticeInsufficientToken();
        }
      } else {
        setIsOpenModalBuy(false);
        handleOpenNoticeConnectModal();
      }
    };

    const handleCheckApproveToken = async () => {
      const toyTokenAllowance = (await MarketplaceService.getTokenAllowance(
        nftContractAddress,
        walletAddress,
      )) as number;
      if (toyTokenAllowance > nftData.price) {
        handleBuyNft();
      } else {
        handleApproveToken();
      }
    };

    const handleOpenNoticeConnectModal = () => {
      showGlobalModal(MODAL_TYPES.noticeModal, {
        modalTitleProps: { title: getLabel("lError") },
        modalContentProps: {
          content: getLabel("msgNeedConnect"),
        },
        onSubmit: closeGlobalModal,
      });
    };

    const handleNoticeInsufficientToken = () => {
      showGlobalModal(MODAL_TYPES.noticeModal, {
        modalTitleProps: { title: getLabel("lInsufficientToken") },
        modalContentProps: {
          content: (
            <AppTrans
              i18nKey={getLabel("msgInsufficientToken", {
                total: FormatUtils.formatNumber(nftData.price),
              })}
            />
          ),
        },
        onSubmit: closeGlobalModal,
      });
    };

    const handleApproveToken = async () => {
      setLabel(getLabel("lContinue"));
      setIsOpenTransactionModal(true);
      const encodedData = await MarketplaceService.createApproveToyTokenData(
        EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_TOY_TOKEN,
        walletAddress,
        nftContractAddress,
      );

      if (!encodedData) {
        return;
      }
      setIsOpenModalBuy(false);
      await handleSendTransaction(walletAddress, encodedData);
    };

    const handleBuyNft = async () => {
      setStep(POLYGON_NFT_TRANSACTION_STEP.sendTransaction);
      setLabel(getLabel("lOk"));
      setIsOpenTransactionModal(true);
      setIsOpenModalBuy(false);
      handleResetTransactionState();
      const endCodedBuyData = await MarketplaceService.createBuyNftData(
        nftData.saleId,
        walletAddress,
        nftContractAddress,
      );

      if (!endCodedBuyData) {
        return;
      }
      await handleSendTransaction(walletAddress, endCodedBuyData);
    };

    useEffect(() => {
      if (
        transactionHash &&
        transactionData?.status === AppConstant.TRANSACTION_STATUS_TYPE.complete
      ) {
        MarketplaceService.postBuyNftDetail(nftData.id, transactionHash);
      }
    }, [transactionHash]);

    return (
      <>
        <BuyNFTMarketplaceCardStarter onStartBuyCard={handleOpenBuyModal} {...props} />
        <AppTransactionProgressModal
          onClick={() => setIsOpenTransactionModal(false)}
          onContinue={handleBuyNft}
          open={isOpenTransactionModal}
          onClose={() => setIsOpenTransactionModal(false)}
          startStep={step}
          transactionStatus={buyCardStatus}
          transactionHash={transactionHash}
          transactionSteps={getDefaultTransactionSteps(objBuyNftContent)}
          buttonProps={{ label }}
          modalTitleProps={{ title: getLabel("lBuyCard") }}
        />
        <BuyCardModal
          modalTitleProps={{ title: getLabel("lBuyCard") }}
          open={isOpenModalBuy}
          onClose={() => setIsOpenModalBuy(false)}
          data={nftData}
          onBuyNft={handleCheckBuyCondition}
        />
      </>
    );
  };
  return WithBuyNFTMarketplaceComponent;
}

export type WithBuyNFTMarketplaceComponentProps = {
  onStartBuyCard?: (data: NFTClass) => void;
};

export default withBuyNftMarketplaceController;

export const getDefaultTransactionSteps = (objBuyNftContent: ObjectMultiLanguageProps) => {
  return [
    {
      label: objBuyNftContent.lApprove,
      description: objBuyNftContent.msgApprove,
    },
    {
      label: objBuyNftContent.lBuyBox,
      description: objBuyNftContent.msgBuyBox,
    },
  ];
};

const POLYGON_NFT_TRANSACTION_STEP = {
  [AppConstant.TRANSACTION_STEP.approveToken]: 1,
  [AppConstant.TRANSACTION_STEP.sendTransaction]: 2,
};
