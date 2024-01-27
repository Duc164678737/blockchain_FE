import React, { useState } from "react";
import { Box } from "@mui/material";
import { AppButton, AppTransactionProgressModal, AppTypography } from "components/common";
import { AppConstant } from "const";

const DemoTransactionModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState("Continue");

  return (
    <Box>
      <AppTypography mt={2}>Demo App Transaction Modal</AppTypography>
      <AppButton onClick={() => setIsOpen(true)} variant="contained">
        Open Transaction Modal
      </AppButton>
      <AppTransactionProgressModal
        onClick={() => setIsOpen(false)}
        onContinue={() => {
          setLabel("Ok");
        }}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        startStep={MOCK_DATA.startStep}
        transactionStatus={MOCK_DATA.transactionStatus}
        transactionHash={MOCK_DATA.transactionHash}
        transactionSteps={MOCK_DATA.transactionSteps}
        buttonProps={{ label }}
        modalTitleProps={{ title: "Modal transaction" }}
      />
    </Box>
  );
};

const MOCK_DATA = {
  startStep: 1,
  transactionHash: "0x244dede8286d829f64ac0b7f42e968bb480ff2d6e4e198cd8d115de05d7f314f",
  transactionStatus: AppConstant.TRANSACTION_STATUS.transactionProcessing,
  transactionSteps: [
    {
      label: "Approve",
      description: "You are approving transactions with your wallet",
    },
    {
      label: "Buy Box",
      description: "You are buying with your wallet",
    },
  ],
};

export default DemoTransactionModal;
