import { Stack } from "@mui/material";
import { AppInput, AppTypography } from "components/common";
import React from "react";

const DemoAppInput = () => {
  return (
    <Stack spacing={2}>
      <AppTypography>Demo Input</AppTypography>
      <AppInput />
      <AppInput disabled value="Search NFT" />
    </Stack>
  );
};

export default DemoAppInput;
