import React, { ComponentType, useEffect, useState } from "react";
import { AppSnackbar } from "components/common";
import { ApiConstant, AppConstant } from "const";
import { NFTClass } from "models";
import { useTranslation } from "react-i18next";
import { useAuthContext, useGlobalModalContext } from "context";
import { InventoryService, MarketplaceService } from "services";
import { useTransaction } from "hooks";
import { MODAL_TYPES } from "context/GlobalModalContext";

function withCancelSellNftController<T>(CancelSellStarterComponent: ComponentType<T>) {
  const withCancelSellNftComponent = (props: T) => {
    const { t: getLabel } = useTranslation();
    const { walletAddress } = useAuthContext();
    const { showGlobalModal, closeGlobalModal } = useGlobalModalContext();
    const {
      transactionHash,
      transactionData,
      errorMessage,
      handleSendTransaction,
      handleResetTransactionState,
    } = useTransaction();

    const [isOpenSnackBar, setIsOpenSnackbar] = useState(false);
    const [isCancelSellNft, setIsCancelSellNft] = useState(false);
    const [snackbarStatus, setSnackbarStatus] = useState(AppConstant.SNACKBAR_STATUS.success);
    const [messageSnackBar, setMessageSnackBar] = useState("");
    const [newData, setNewData] = useState<NFTClass>();

    const handleCancelSell = async (data: NFTClass) => {
      setNewData(data);
      setIsCancelSellNft(true);
      handleResetTransactionState();
      const cancelListingCardData = await InventoryService.createCancelListingNft(
        data.saleId,
        walletAddress,
      );
      await handleSendTransaction(walletAddress, cancelListingCardData);
    };

    const handleCancelNftDetail = async (newData: NFTClass, transactionHash: string) => {
      const res = await MarketplaceService.postCancelNftDetail(newData.id, transactionHash);
      if (res.status === ApiConstant.STT_CREATED) {
        handleNoticeCancel();
      }
    };

    const handleNoticeCancel = () => {
      showGlobalModal(MODAL_TYPES.noticeModal, {
        modalTitleProps: { title: getLabel("objLoadingStatus.lProcessing") },
        modalContentProps: {
          content: getLabel("msgCancelListing"),
        },
        onSubmit: closeGlobalModal,
      });
    };

    useEffect(() => {
      if (transactionHash && newData) {
        handleCancelNftDetail(newData, transactionHash);
      }
    }, [transactionHash, newData]);

    useEffect(() => {
      if (errorMessage) {
        setIsOpenSnackbar(true);
        setSnackbarStatus(AppConstant.SNACKBAR_STATUS.error);
        setMessageSnackBar(errorMessage);
        setIsCancelSellNft(false);
      } else {
        if (transactionData?.status === AppConstant.TRANSACTION_STATUS_TYPE.complete) {
          setIsOpenSnackbar(true);
          setSnackbarStatus(AppConstant.SNACKBAR_STATUS.success);
          setMessageSnackBar(getLabel("msgSuccess"));
          setIsCancelSellNft(false);
        }
      }
    }, [errorMessage, transactionData]);

    return (
      <>
        <CancelSellStarterComponent
          onCancelStartSellCard={handleCancelSell}
          isCancelSell={isCancelSellNft}
          {...props}
        />
        <AppSnackbar
          contentProps={{ message: messageSnackBar }}
          open={isOpenSnackBar}
          status={snackbarStatus}
          onClose={() => setIsOpenSnackbar(false)}
        />
      </>
    );
  };
  return withCancelSellNftComponent;
}

export default withCancelSellNftController;

export interface CancelSellNftControllerProps {
  onCancelStartSellCard?: (data: NFTClass) => void;
  isCancelSell?: boolean;
}
