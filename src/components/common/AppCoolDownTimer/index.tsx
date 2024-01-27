import React, { memo, useMemo } from "react";
import { Box, BoxProps, Stack, StackProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AppTypography } from "components/common";
import { CommonUtils, DateUtils } from "utils";
import { AppTypographyProps, StringOrNumber } from "models/types";
import { useCountdownByTimestamp } from "hooks";
import { getTimeLabel } from "./helper";
import clsx from "clsx";

const AppCoolDownTimer = ({
  secondsRemaining,
  onFinish,
  wrapperProps = {},
  labelProps,
  ...otherProps
}: AppCoolDownTimerProps) => {
  const { t: getLabel } = useTranslation();

  const { className: wrapperClassName, ...otherWrapperProps } = wrapperProps;

  const coolDownTime = useCountdownByTimestamp(secondsRemaining, onFinish);

  const objectTimer = useMemo(() => {
    if (typeof coolDownTime !== "object" && CommonUtils.isGreaterThanOrEqualZero(coolDownTime)) {
      return DateUtils.getSpecificCoolingTime(coolDownTime);
    } else {
      return {};
    }
  }, [coolDownTime]);

  return (
    <Stack direction="row" width="fit-content" {...otherProps}>
      {Object.entries(objectTimer).map(([key, value], index) => {
        const newValue = DateUtils.convertTimeToSpecificDigits(value as StringOrNumber);
        const isHiddenValue = value === 0 && ["years", "months"].includes(key);

        return (
          <Box key={index} className={clsx("center-root", wrapperClassName)} {...otherWrapperProps}>
            {!isHiddenValue && (
              <>
                <AppTypography fontWeight={500} {...labelProps}>
                  {newValue}
                </AppTypography>
                <AppTypography fontWeight={500} mr={0.5} {...labelProps}>
                  {getTimeLabel(key, getLabel)}
                </AppTypography>
              </>
            )}
          </Box>
        );
      })}
    </Stack>
  );
};

type AppCoolDownTimerProps = StackProps & {
  secondsRemaining: number;
  wrapperProps?: BoxProps;
  labelProps?: AppTypographyProps;

  onFinish: () => void;
};

export default memo(AppCoolDownTimer);
