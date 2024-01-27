import React from "react";
import { Box, Stack } from "@mui/material";
import { AppButton, AppTypography } from "components/common";
import { useGlobalModalContext, MODAL_TYPES } from "context/GlobalModalContext";

const DemoGlobalModal = () => {
  const { showGlobalModal, closeGlobalModal } = useGlobalModalContext();

  const handleOpenConFirmModal = () => {
    showGlobalModal(MODAL_TYPES.confirmModal, {
      modalContentProps: {
        content:
          "The network you are using is not supported by our platform. Please change your network to Aptos.",
      },
      onConfirm: closeGlobalModal,
      onCancel: closeGlobalModal,
      modalTitleProps: { title: "Unsupported Network" },
    });
  };

  const handleOpenNoticeModal = () => {
    showGlobalModal(MODAL_TYPES.noticeModal, {
      modalTitleProps: { title: "Discord Connection" },
      modalContentProps: {
        content:
          "You must connect your Discord account before doing any transaction in NFT Market.",
      },
      onSubmit: closeGlobalModal,
    });
  };

  return (
    <Box>
      <AppTypography>Demo Global modal</AppTypography>
      <Stack spacing={2} direction="row">
        <AppButton variant="contained" onClick={handleOpenConFirmModal}>
          Show Confirm Modal
        </AppButton>
        <AppButton variant="contained" onClick={handleOpenNoticeModal}>
          Show Notice Modal
        </AppButton>
      </Stack>
    </Box>
  );
};

export default DemoGlobalModal;
