import Blockchain from "blockchain";
import { AppConstant, NetworkConstant } from "const";
import { ethers } from "ethers";

/** Convert blockchain response to number
 *
 * @param {any} [value] - value needs to convert
 *
 * @return {number | null} Converted number or null value
 */
export const convertTokenBalance = (value: any) => {
  if (!value) return null;
  return Number(convertTokenBalanceString(value));
};

/** Convert blockchain response to number
 *
 * @param {any} [value] - value needs to convert
 *
 * @return {string | null} Converted number or null value
 */
export const convertTokenBalanceString = (value: any) => {
  if (!value) return null;

  const { chain } = new Blockchain();

  switch (chain) {
    case NetworkConstant.CHAIN_SUPPORT.polygon:
      return ethers.utils.formatEther(value);
    default:
      return;
  }
};

export const getTransactionStepStatus = (
  transactionStatus: AppConstant.TRANSACTION_STATUS_TYPE,
  transactionStep: number,
  currentBlockchainFlow: {
    [x: string]: number;
  },
  errorCode: string,
) => {
  switch (transactionStatus) {
    case AppConstant.TRANSACTION_STATUS_TYPE.loading:
      if (transactionStep === currentBlockchainFlow?.approveToken) {
        return AppConstant.TRANSACTION_STATUS.approvingToken;
      } else if (transactionStep === currentBlockchainFlow?.approveInventory) {
        return AppConstant.TRANSACTION_STATUS.approvingInventory;
      } else {
        return AppConstant.TRANSACTION_STATUS.transactionProcessing;
      }
    case AppConstant.TRANSACTION_STATUS_TYPE.complete:
      if (transactionStep === currentBlockchainFlow?.approveToken) {
        return AppConstant.TRANSACTION_STATUS.approveTokenSuccess;
      } else if (transactionStep === currentBlockchainFlow?.approveInventory) {
        return AppConstant.TRANSACTION_STATUS.approveInventorySuccess;
      } else {
        return AppConstant.TRANSACTION_STATUS.transactionSuccess;
      }
    case AppConstant.TRANSACTION_STATUS_TYPE.failed:
      if (errorCode === AppConstant.TYPE_ERROR_TRANSACTION_NFT.actionRejected) {
        return AppConstant.TRANSACTION_STATUS.transactionCancelled;
      } else {
        if (transactionStep === currentBlockchainFlow?.approveToken) {
          return AppConstant.TRANSACTION_STATUS.approveTokenFailed;
        } else if (transactionStep === currentBlockchainFlow?.approveInventory) {
          return AppConstant.TRANSACTION_STATUS.approveInventoryFailed;
        } else {
          return AppConstant.TRANSACTION_STATUS.transactionFailed;
        }
      }

    default:
      return;
  }
};
