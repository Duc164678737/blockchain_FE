import { AppSnackbar } from "components/common";
import { AppConstant, NFTConstant } from "const";
import { useAuthContext } from "context";
import { useTransaction } from "hooks";
import { NFTClass } from "models";
import { ComponentType, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { InventoryService } from "services";
import { createUnstakeOrder } from "./helper";

function withUnStakeNftController<T>(UnStakeStarterComponent: ComponentType<T>) {
  const withUnStakeNftComponent = (props: T) => {
    const { t: getLabel } = useTranslation();
    const { walletAddress } = useAuthContext();
    const { transactionData, errorMessage, handleSendTransaction, handleResetTransactionState } =
      useTransaction();

    const [isOpenSnackBar, setIsOpenSnackbar] = useState(false);
    const [isUnStakingNft, setIsUnStakingNft] = useState(false);
    const [snackbarStatus, setSnackbarStatus] = useState(AppConstant.SNACKBAR_STATUS.success);
    const [messageSnackBar, setMessageSnackBar] = useState("");

    const handleClickUnStake = async (
      nftInGameDetail: NFTClass,
      nftType: NFTConstant.NFT_CLASS_TYPE,
    ) => {
      setIsUnStakingNft(true);
      handleResetTransactionState();
      const orderId = nftInGameDetail.item.gameItemId;

      const unstakeOrderData = await createUnstakeOrder(nftType, orderId, 1);
      const { gameSignature, id } = unstakeOrderData;

      if (gameSignature) {
        const { tokenId, gameItemId } = unstakeOrderData.item;
        if (tokenId) {
          handleUnstakeCardNft(id, gameItemId, tokenId, gameSignature);
        } else {
          handleMintNft(nftInGameDetail, id, gameSignature);
        }
      } else {
        setIsUnStakingNft(false);
        setIsOpenSnackbar(true);
        setSnackbarStatus(AppConstant.SNACKBAR_STATUS.error);
        // TOTO: update when API deploy
        setMessageSnackBar(getLabel("msgError"));
      }
    };

    const handleUnstakeCardNft = async (
      orderId: string,
      metadataId: string,
      nftId: number,
      signature: string,
    ) => {
      const unStakeCardTransaction = await InventoryService.createUnStakeCardTransaction(
        walletAddress,
        orderId,
        metadataId,
        nftId,
        signature,
      );
      await handleSendTransaction(walletAddress, unStakeCardTransaction);
    };

    const handleMintNft = async (nftInGameDetail: NFTClass, id: string, gameSignature: string) => {
      const { rareType, itemType } = nftInGameDetail;
      const { gameItemId } = nftInGameDetail.item;
      const mintTransaction = InventoryService.createMintCardTransaction(
        walletAddress,
        rareType,
        itemType,
        gameItemId,
        id,
        gameSignature,
      );
      await handleSendTransaction(walletAddress, mintTransaction);
    };

    useEffect(() => {
      if (errorMessage) {
        setIsOpenSnackbar(true);
        setSnackbarStatus(AppConstant.SNACKBAR_STATUS.error);
        setMessageSnackBar(errorMessage);
        setIsUnStakingNft(false);
      } else {
        if (transactionData?.status === AppConstant.TRANSACTION_STATUS_TYPE.complete) {
          setIsOpenSnackbar(true);
          setSnackbarStatus(AppConstant.SNACKBAR_STATUS.success);
          setMessageSnackBar(getLabel("msgSuccess"));
          setIsUnStakingNft(false);
        }
      }
    }, [errorMessage, transactionData]);

    return (
      <>
        <UnStakeStarterComponent
          onUnStakeCard={handleClickUnStake}
          isUnStaking={isUnStakingNft}
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
  return withUnStakeNftComponent;
}

export default withUnStakeNftController;

export interface UnStakeNftControllerProps {
  onUnStakeCard: (nftInGameDetail: NFTClass, nftType: NFTConstant.NFT_CLASS_TYPE) => void;
  isUnStaking?: boolean;
}
