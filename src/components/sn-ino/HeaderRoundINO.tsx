import React, { useMemo } from "react";
import { Box, BoxProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppCoolDownTimer, AppTypography } from "components/common";
import { ThemeProps } from "models/types";
import { useTranslation } from "react-i18next";
import { AppConstant, LangConstant } from "const";
import clsx from "clsx";

const HeaderRoundINO = ({
  status,
  timer,
  currentRound,
  onFinish,
  className,
}: HeaderRoundINOProps) => {
  const defaultClasses = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_INO);

  const { label, classNameStatus } = useMemo(() => {
    switch (status) {
      case AppConstant.HEADER_ROUND_INO_STATUS.expireIn:
        return { label: getLabel("lExpireIn"), classNameStatus: defaultClasses.expireIn };
      case AppConstant.HEADER_ROUND_INO_STATUS.startIn:
        return { label: getLabel("lStartIn"), classNameStatus: defaultClasses.startIn };
      case AppConstant.HEADER_ROUND_INO_STATUS.end:
        return { label: getLabel("lEnd"), classNameStatus: defaultClasses.end };
      case AppConstant.HEADER_ROUND_INO_STATUS.soldOut:
        return { label: getLabel("lSoldOut"), classNameStatus: defaultClasses.soldOut };
      default:
        return { label: "", classNameStatus: "" };
    }
  }, [status, getLabel]);

  return (
    <Box className={clsx(defaultClasses.container, className)}>
      {currentRound && (
        <AppTypography className={defaultClasses.headerTypoGraphy}>{`${getLabel(
          "lRound",
        )} ${currentRound}`}</AppTypography>
      )}
      <Box className={clsx(defaultClasses.contentWrapper)}>
        <AppTypography
          className={clsx(defaultClasses.contentWrapper, classNameStatus, defaultClasses.label)}
        >
          {label}
        </AppTypography>
        {timer && (
          <AppCoolDownTimer
            secondsRemaining={timer}
            labelProps={{ className: clsx(defaultClasses.contentWrapper, classNameStatus) }}
            onFinish={onFinish}
          />
        )}
      </Box>
    </Box>
  );
};

type HeaderRoundINOProps = BoxProps & {
  status: AppConstant.HEADER_ROUND_INO_STATUS;
  timer?: number;
  currentRound?: number;

  onFinish: () => void;
};

export default HeaderRoundINO;

const useStyles = makeStyles((theme: ThemeProps) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTypoGraphy: {
    fontFamily: "Russo One",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 32,
    lineHeight: "39px",
    color: theme.palette.light.main,
    marginBottom: 12,
  },
  contentWrapper: {
    fontFamily: "Rubik",
    fontWeight: 500,
    fontSize: 20,
    lineHeight: "24px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginRight: 5,
  },
  expireIn: {
    color: theme.palette.success.light2,
  },
  startIn: {
    color: theme.palette.info.light2,
  },
  end: {
    fontFamily: "Russo One",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 48,
    lineHeight: "58px",
    color: theme.palette.light.main,
  },
  soldOut: {
    fontFamily: "Russo One",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 48,
    lineHeight: "58px",
    color: theme.palette.error.light3,
  },
}));
