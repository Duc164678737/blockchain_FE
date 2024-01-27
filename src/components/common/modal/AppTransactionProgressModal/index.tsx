import React, { memo, useState, useMemo, useEffect, ReactNode } from "react";
import { makeStyles } from "@mui/styles";
import { AppModal, AppButton, AppButtonProps, AppModalProps } from "components/common";
import { AppConstant } from "const";
import TransactionStep, { TransactionStepProps, TransactionStepType } from "./TransactionStep";
import TransactionStatus, { TransactionStatusProps } from "./TransactionStatus";
import clsx from "clsx";
import { ValueOf } from "models/types";

const AppTransactionProgressModal = ({
  customFooter,
  buttonProps = {},
  startStep,
  transactionSteps,
  transactionStepProps,
  transactionStatus,
  transactionStatusProps,
  transactionHash,
  onClick,
  onClose,
  onContinue,
  ...otherProps
}: AppTransactionProgressModalProps) => {
  const defaultClasses = useStyles();

  const {
    label: buttonLabel,
    className: buttonClassName,
    wrapperProps: buttonWrapperProps,
    ...otherButtonProps
  } = buttonProps;

  const [currentStep, setCurrentStep] = useState(startStep);

  const [status, isProcessing] = useMemo(() => {
    switch (transactionStatus) {
      case AppConstant.TRANSACTION_STATUS.transactionCancelled:
        return [AppConstant.TRANSACTION_STATUS_TYPE.cancel, false];

      case AppConstant.TRANSACTION_STATUS.approveInventoryFailed:
      case AppConstant.TRANSACTION_STATUS.approveTokenFailed:
      case AppConstant.TRANSACTION_STATUS.transactionFailed:
        return [AppConstant.TRANSACTION_STATUS_TYPE.failed, false];

      case AppConstant.TRANSACTION_STATUS.approveTokenSuccess:
      case AppConstant.TRANSACTION_STATUS.transactionSuccess:
      case AppConstant.TRANSACTION_STATUS.approveInventorySuccess:
        return [AppConstant.TRANSACTION_STATUS_TYPE.complete, false];

      case AppConstant.TRANSACTION_STATUS.approvingToken:
      case AppConstant.TRANSACTION_STATUS.transactionProcessing:
      case AppConstant.TRANSACTION_STATUS.approvingInventory:
      default:
        return [AppConstant.TRANSACTION_STATUS_TYPE.loading, true];
    }
  }, [transactionStatus, transactionHash]);

  const isTransactionFailed = useMemo(() => {
    return [
      AppConstant.TRANSACTION_STATUS_TYPE.failed,
      AppConstant.TRANSACTION_STATUS_TYPE.cancel,
    ].includes(status);
  }, [status]);

  const isFinishTransaction = useMemo(() => {
    return isTransactionFailed || currentStep === transactionSteps.length;
  }, [isTransactionFailed, currentStep, transactionSteps.length]);

  const handleFinishTransaction = () => {
    if (isTransactionFailed) {
      onClose();
      return;
    }
    onClick();
  };

  const handleExecuteNextStep = () => {
    setCurrentStep(currentStep + 1);
    if (onContinue instanceof Function) {
      onContinue();
    }
  };

  const handleExecuteAction = () => {
    if (isFinishTransaction) {
      handleFinishTransaction();
    } else {
      handleExecuteNextStep();
    }
  };

  useEffect(() => {
    setCurrentStep(startStep);
  }, [startStep]);

  return (
    <AppModal
      onClose={onClose}
      modalContentProps={{
        content: (
          <>
            <TransactionStep
              currentStep={currentStep}
              transactionSteps={transactionSteps}
              {...transactionStepProps}
            />
            <TransactionStatus
              transactionStatus={status}
              transactionHash={transactionHash || ""}
              {...transactionStatusProps}
            />
          </>
        ),
      }}
      modalActionsProps={{
        children: customFooter ?? (
          <AppButton
            disabled={isProcessing}
            variant="contained"
            onClick={handleExecuteAction}
            className={clsx(defaultClasses.button, buttonClassName)}
            wrapperProps={{
              ...buttonWrapperProps,
              className: clsx(defaultClasses.button, buttonWrapperProps?.className),
            }}
            {...otherButtonProps}
          >
            {buttonLabel}
          </AppButton>
        ),
      }}
      {...otherProps}
    />
  );
};

export type AppTransactionProgressModalProps = AppModalProps & {
  customFooter?: ReactNode;
  buttonProps?: AppButtonProps & { label?: string };
  startStep: number;
  transactionHash?: string | null;
  transactionSteps: TransactionStepType;
  transactionStepProps?: Pick<
    TransactionStepProps,
    "dividerProps" & "stepWrapperProps" & "numberStepProps"
  >;
  transactionStatus?: ValueOf<typeof AppConstant.TRANSACTION_STATUS>;
  transactionStatusProps?: Pick<
    TransactionStatusProps,
    "stackWrapperProps" & "transactionLoadingStatusProps"
  >;

  onClick: () => void;
  onContinue?: () => void;
};

export default memo(AppTransactionProgressModal);

const useStyles = makeStyles({
  imagePreview: {
    width: "auto",
    objectFit: "contain",
  },
  button: {
    width: "100%",
  },
});
