import React from "react";
import { AppIconButton, AppTypography } from "components/common";
import { TimesIcon } from "components/icons";
import { Stack } from "@mui/material";

const DemoIconButton = () => {
  return (
    <Stack>
      <AppTypography>Demo Icon Button</AppTypography>
      <AppIconButton>
        <TimesIcon sx={{ stroke: "white", color: "white" }} />
      </AppIconButton>
    </Stack>
  );
};

export default DemoIconButton;
