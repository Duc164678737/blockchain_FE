import React from "react";
import { Box } from "@mui/material";
import { AppRadio, AppTypography } from "components/common";

const DemoAppRadio = () => {
  return (
    <Box>
      <AppTypography mt={2}>Demo App Radio</AppTypography>
      <AppRadio />
      <AppRadio checked />
      <AppRadio disabled />
      <AppRadio disabled checked />
    </Box>
  );
};

export default DemoAppRadio;
