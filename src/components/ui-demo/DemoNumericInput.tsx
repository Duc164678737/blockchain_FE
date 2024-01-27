import React from "react";
import { AppNumericInput, AppTypography } from "components/common";
import { Stack } from "@mui/material";

const DemoNumericInput = () => {
  return (
    <Stack>
      <AppTypography>Demo Numeric Input</AppTypography>
      <AppNumericInput
        onChangeValue={() => {
          return;
        }}
        minValue={1}
        maxValue={5}
      />
      <AppNumericInput
        onChangeValue={() => {
          return;
        }}
        minValue={1}
        maxValue={5}
        isDisabled
      />
    </Stack>
  );
};

export default DemoNumericInput;
