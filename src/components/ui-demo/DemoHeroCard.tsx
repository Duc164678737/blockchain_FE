import React from "react";
import { Stack } from "@mui/material";
import { AppTypography } from "components/common";

const DemoHeroCard = () => {
  return (
    <Stack spacing={0.5}>
      <AppTypography>Demo Hero Card</AppTypography>
      <Stack gap="24px 16px" direction="row" flexWrap="wrap"></Stack>
    </Stack>
  );
};

export default DemoHeroCard;
