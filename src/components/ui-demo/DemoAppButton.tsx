import { Stack } from "@mui/material";
import { AppButton, AppTypography } from "components/common";
import React from "react";

const DemoAppButton = () => {
  return (
    <Stack spacing={0.5}>
      <AppTypography>Demo Button</AppTypography>
      <Stack spacing={1.5} direction="row">
        <AppButton variant="contained">Button</AppButton>
        <AppButton variant="outlined">Button</AppButton>
        <AppButton variant="text">Button</AppButton>
        <AppButton disabled>Button</AppButton>
      </Stack>
    </Stack>
  );
};

export default DemoAppButton;
