import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AppConstant, EnvConstant } from "const";
import Blockchain from "blockchain";
import { IReceiptTransaction } from "models/types";

const useTransaction = () => {
  const { t: getLabel } = useTranslation();
  const { sendTransaction, getTransactionResult } = new Blockchain();

  const [transactionStatus, setTransactionStatus] = useState<AppConstant.TRANSACTION_STATUS_TYPE>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [errorCode, setErrorCode] = useState("");
  const [transactionHash, setTransactionHash] = useState<string | null>("");
  const [transactionData, setTransactionData] = useState<IReceiptTransaction>();

  const handleResetTransactionState = () => {
    setTransactionStatus(undefined);
    setErrorMessage(undefined);
    setErrorCode("");
    setTransactionHash("");
    setTransactionData(undefined);
  };

  const handleSendTransaction = async (walletAddress: string, data: object | undefined) => {
    try {
      setTransactionStatus(AppConstant.TRANSACTION_STATUS_TYPE.loading);
      const transactionHash = await sendTransaction(walletAddress, data);

      setTransactionHash(transactionHash);
      const transactionResult = (await getTransactionResult(
        transactionHash as string,
      )) as IReceiptTransaction;

      setTransactionStatus(transactionResult.status);
      setTransactionData(transactionResult);

      if (transactionResult.status === AppConstant.TRANSACTION_STATUS_TYPE.failed) {
        setErrorMessage(transactionResult.message);
      }
    } catch (e) {
      EnvConstant.IS_DEV && console.log(e);

      const error = e as TypeErrorSendTransaction;
      setTransactionStatus(AppConstant.TRANSACTION_STATUS_TYPE.failed);
      setErrorMessage(error?.message || getLabel("msgWentWrong"));
      setErrorCode(error?.code);
    }
  };
  return {
    transactionStatus,
    errorMessage,
    errorCode,
    transactionHash,
    transactionData,
    handleResetTransactionState,
    handleSendTransaction,
  };
};

export default useTransaction;

export interface TypeErrorSendTransaction {
  status: string;
  code: string;
  message: string;
}
