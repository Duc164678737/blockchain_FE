import React, { useMemo, useState } from "react";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { BoxProps } from "@mui/system";
import { AppButton, AppNumericInput, AppTypography, DetailRateBox } from "components/common";
import { ThemeProps } from "models/types";
import { FormatUtils } from "utils";
import { useTranslation } from "react-i18next";
import { AppConstant, LangConstant } from "const";
import clsx from "clsx";

const PanelINO = ({ toysMoney, usdMoney, className }: PanelINOProps) => {
  const defaultClasses = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_INO);
  const { t: getLabelBuy } = useTranslation(LangConstant.NS_INVENTORY);

  const [totalItemBuy, setTotalItemBuy] = useState<number>(1);

  const onChangeBuyItem = (valueItemBuy: number) => {
    setTotalItemBuy(valueItemBuy);
  };
  const { totalToysMoney, totalUSDMoney } = useMemo(() => {
    return {
      totalToysMoney: totalItemBuy * toysMoney,
      totalUSDMoney: totalItemBuy * usdMoney,
    };
  }, [toysMoney, usdMoney, totalItemBuy]);

  return (
    <Box className={clsx(defaultClasses.container, className)}>
      <AppTypography classes={{ root: defaultClasses.title }}>{getLabel("lBoxBlue")}</AppTypography>
      <Box>
        <AppTypography classes={{ root: defaultClasses.titleRateBox }}>
          {getLabel("lDropRate")}
        </AppTypography>
        <DetailRateBox />
      </Box>
      <AppTypography classes={{ root: defaultClasses.textContent }}>
        {getLabel("lBoxMysteries")}
      </AppTypography>
      <Box className={defaultClasses.money}>
        <AppTypography classes={{ root: defaultClasses.moneyTOYS }}>
          {FormatUtils.formatPriceWithToken(totalToysMoney)}
        </AppTypography>
        &#8776;
        <AppTypography classes={{ root: defaultClasses.moneyUSD }}>
          {FormatUtils.formatPriceWithToken(totalUSDMoney, AppConstant.USD)}
        </AppTypography>
      </Box>
      <Box className={defaultClasses.oderBox}>
        <AppNumericInput
          className={defaultClasses.rootNumericInput}
          isDivider={false}
          minusIconProps={{ classes: { root: defaultClasses.buttonNumericInput } }}
          plusIconProps={{ classes: { root: defaultClasses.buttonNumericInput } }}
          onChangeValue={onChangeBuyItem}
          minValue={1}
          maxValue={5}
        />
        <AppButton variant="contained" classes={{ root: defaultClasses.rootButton }}>
          {getLabelBuy("lBuy")}
        </AppButton>
      </Box>
      <AppTypography classes={{ root: defaultClasses.textOderBox }}>
        {getLabel("lItemCanBuy")}
      </AppTypography>
    </Box>
  );
};

type PanelINOProps = BoxProps & {
  toysMoney: number;
  usdMoney: number;
};

export default PanelINO;

const useStyles = makeStyles((theme: ThemeProps) => ({
  container: {
    width: 543,
    background: theme.palette.layout.secondary,
    borderRadius: 8,
    padding: theme.spacing(3),
  },
  title: {
    fontWeight: theme.typography.fontWeightBold,
    fontSize: theme.typography.h4.fontSize,
    lineHeight: "38px",
    marginBottom: theme.spacing(2.5),
    color: theme.palette.primary.contrastText,
  },
  titleRateBox: {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.fontSize,
    lineHeight: "17px",
    marginBottom: theme.spacing(0.5),
    color: theme.palette.light.light4,
  },
  textContent: {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.body1.fontSize,
    lineHeight: "19px",
    textTransform: "capitalize",
    color: theme.palette.light.light5,
    marginTop: theme.spacing(2.5),
  },
  money: {
    display: "flex",
    fontSize: theme.typography.h5.fontSize,
    lineHeight: theme.typography.h6.lineHeight,
    color: theme.palette.light.light3,
    alignItems: "center",
    marginTop: theme.spacing(2.5),
  },
  moneyTOYS: {
    fontFamily: "Russo One",
    fontSize: theme.typography.h5.fontSize,
    lineHeight: "29px",
    color: theme.palette.primary.main,
    marginRight: theme.spacing(1.125),
  },
  moneyUSD: {
    fontSize: theme.typography.htmlFontSize,
    lineHeight: theme.typography.h6.lineHeight,
    color: theme.palette.light.light3,
    marginLeft: theme.spacing(1.125),
  },
  oderBox: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2.5),
  },
  textOderBox: {
    fontStyle: "italic",
    fontSize: theme.typography.body2.fontSize,
    lineHeight: "17px",
    color: theme.palette.primary.contrastText,
    marginTop: theme.spacing(2.5),
  },
  rootButton: {
    minWidth: 193,
  },
  rootNumericInput: {
    width: 193,
    background: theme.palette.secondary.light4,
    borderRadius: 8,
    marginRight: theme.spacing(2),
  },
  buttonNumericInput: {
    background: theme.palette.grey[40],
    borderRadius: 6,
    "&:hover": {
      background: theme.palette.grey[40],
    },
  },
}));
