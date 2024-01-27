import { Stack } from "@mui/material";
import { AppImage, AppTypography } from "components/common";
import { ImageConstant } from "const";
import React, { memo } from "react";
import { FormatUtils } from "utils";

const TokenPrice = () => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <AppImage src={ImageConstant.TokenImage} width={20} height={20} />
      <AppTypography color="light.light2" variant="body2">
        ${FormatUtils.formatNumber(MOCK_PRICE)}
      </AppTypography>
    </Stack>
  );
};

// TODO: update price when have api
const MOCK_PRICE = 0.835;

export default memo(TokenPrice);
