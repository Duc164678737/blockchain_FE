import React, { useState } from "react";
import { Box } from "@mui/material";
import { AppTypography, AppModal, AppButton } from "components/common";

const DemoCommonModal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <Box>
      <AppTypography>Demo common modal</AppTypography>
      <AppButton variant="contained" onClick={() => setIsOpenModal(true)}>
        Common Modal
      </AppButton>
      <AppModal
        modalTitleProps={{ title: "Notification..." }}
        modalContentProps={{
          content:
            "Lorem ipsum dolor sit amet consectetur. Lobortis facilisi bibendum justo odio. Elit viverra viverra augue tellus nullam sed. Dignissim dolor dictum cursus et mollis ut maecenas. Cras adipiscing in nunc facilisis.",
        }}
        modalActionsProps={{
          children: (
            <AppButton
              sx={{ width: "100%" }}
              variant="contained"
              onClick={() => setIsOpenModal(false)}
            >
              Ok
            </AppButton>
          ),
        }}
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </Box>
  );
};

export default DemoCommonModal;
