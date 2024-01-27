import React from "react";
import { AppSwitch, AppTypography } from "components/common";
import { Stack } from "@mui/material";

const DemoAppSwitch = () => {
  return (
    <Stack>
      <AppTypography>Demo Switch box</AppTypography>
      <Stack spacing={4} direction="row">
        <AppSwitch />
        <AppSwitch checked={true} />
        <AppSwitch disabled={true} />
        <AppSwitch checked={true} disabled={true} />
      </Stack>
    </Stack>
  );
};

export default DemoAppSwitch;
