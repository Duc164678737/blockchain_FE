import React, { useMemo } from "react";
import { Box, BoxProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppImage, AppTypography } from "components/common";
import { ThemeProps } from "models/types";
import { useTranslation } from "react-i18next";
import { ImageConstant, LangConstant } from "const";
import { FormatUtils } from "utils";
import clsx from "clsx";

const ProcessBarINO = ({
  remainValue,
  totalValue,
  isHiddenIcon,
  className,
}: ProcessBarINOProps) => {
  const defaultClasses = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_INO);

  const progressBarWidth = useMemo(() => {
    if (!remainValue || remainValue <= 0) return 0;

    const progressPercent = (remainValue / totalValue) * 100;

    return Math.round(progressPercent);
  }, [remainValue, totalValue]);

  const boxSold = useMemo(() => {
    if (remainValue && totalValue) {
      return totalValue - remainValue;
    }
  }, [remainValue, totalValue]);

  return (
    <Box className={clsx(defaultClasses.container, className)}>
      <Box className={defaultClasses.top}>
        <AppTypography className={defaultClasses.typoGraphy}>
          {isHiddenIcon && (
            <AppImage
              width={12}
              height={16}
              src={ImageConstant.FireIcon}
              classes={{ root: clsx(defaultClasses.icon) }}
            />
          )}
          {getLabel("fmRemaining", {
            total: FormatUtils.formatNumber(remainValue),
          })}
        </AppTypography>
        <AppTypography>
          {getLabel("fmBoxRemaining", {
            soldBox: FormatUtils.formatNumber(boxSold),
            totalBox: FormatUtils.formatNumber(totalValue),
          })}
        </AppTypography>
      </Box>
      <Box className={defaultClasses.lineBox}>
        <Box
          sx={{
            width: `${progressBarWidth}% `,
            "&:before": {
              display: progressBarWidth === 100 ? "none" : "block",
            },
          }}
          className={defaultClasses.line}
        />
      </Box>
    </Box>
  );
};

type ProcessBarINOProps = BoxProps & {
  remainValue: number;
  totalValue: number;
  isHiddenIcon?: boolean;
};

export default ProcessBarINO;

const useStyles = makeStyles((theme: ThemeProps) => ({
  container: {
    display: "flex",
    flexDirection: "column",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: "19px",
    color: theme.palette.light.light3,
  },
  lineBox: {
    height: 24,
    background: "#141963",
    border: "1px solid #152496",
    borderRadius: 8,
    overflow: "hidden",
  },
  typoGraphy: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    height: 24,
    background: "linear-gradient(270deg, #01E1D0 0%, #144DD8 100%)",
    position: "relative",
    "&:before": {
      content: '""',
      position: "absolute",
      width: 16,
      height: 24,
      right: -8,
      transform: "skew(150deg)",
      background: "#141963",
      marginLeft: theme.spacing(2.5),
    },
  },
  icon: {
    marginRight: theme.spacing(0.75),
  },
}));
