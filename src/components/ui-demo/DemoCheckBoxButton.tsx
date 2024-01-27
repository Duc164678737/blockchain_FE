import React from "react";
import { AppCheckbox, AppTypography } from "components/common";
import { Stack } from "@mui/material";
const DemoCheckBoxButton = () => {
  return (
    <Stack>
      <AppTypography>Demo Check box</AppTypography>
      <Stack spacing={4} direction="row">
        <AppCheckbox />
        <AppCheckbox disabled />
        <AppCheckbox checked />
        <AppCheckbox checked disabled />
      </Stack>
    </Stack>
  );
};

export default DemoCheckBoxButton;
