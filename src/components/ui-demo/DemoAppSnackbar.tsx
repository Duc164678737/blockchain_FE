import React, { useState } from "react";
import { Box } from "@mui/material";
import { AppButton, AppSnackbar, AppTypography } from "components/common";

const DemoAppSnackbar = () => {
  const [isOpenErrorSnackbar, setIsOpenErrorSnackbar] = useState(false);
  const [isOpenSuccessSnackbar, setIsOpenSuccessSnackbar] = useState(false);

  return (
    <Box>
      <AppTypography mt={2}>Demo AppSnackbar</AppTypography>
      <AppButton variant="contained" onClick={() => setIsOpenErrorSnackbar(true)}>
        Open snackbar error
      </AppButton>
      <AppSnackbar
        onClose={() => setIsOpenErrorSnackbar(false)}
        open={isOpenErrorSnackbar}
        status={2}
        contentProps={{
          titleLabel: "Stake failed!",
          message: "There is something wrong with the staking process of #123456 Archer",
        }}
      />
      <AppButton variant="outlined" onClick={() => setIsOpenSuccessSnackbar(true)}>
        Open snackbar success
      </AppButton>
      <AppSnackbar
        onClose={() => setIsOpenSuccessSnackbar(false)}
        open={isOpenSuccessSnackbar}
        status={1}
        contentProps={{
          titleLabel: "Stake successfully!",
          message: "You've staked #123456 The chest in game successfully",
        }}
      />
    </Box>
  );
};

export default DemoAppSnackbar;
