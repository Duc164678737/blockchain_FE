import React, { useMemo } from "react";
import { Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppTypography } from "components/common";
import { LABEL_TOKEN } from "const/app.const";
import { ThemeProps } from "models/types";
import { DateUtils, FormatUtils } from "utils";
import { useTranslation } from "react-i18next";
import { LangConstant } from "const";

const TransactionItem = ({ idTransaction, quantity, price, date }: TransactionItemProps) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_INVENTORY);

  const { date: dateFormat, time: timeFormat } = useMemo(
    () => DateUtils.covertTimeStampToDateFormat(date),
    [date],
  );

  return (
    <>
      <Grid item xs={2.5} className={classes.root}>
        <AppTypography>{idTransaction}</AppTypography>
      </Grid>
      <Grid item xs={2} className={classes.root} textAlign="center">
        <AppTypography>{quantity}</AppTypography>
      </Grid>
      <Grid item xs={2.5} className={classes.root} textAlign="center">
        <AppTypography>{`${FormatUtils.formatNumber(price)} ${LABEL_TOKEN}`}</AppTypography>
      </Grid>
      <Grid item xs={2.5} className={classes.root}>
        <AppTypography>{`${dateFormat}, ${timeFormat}`}</AppTypography>
      </Grid>
      <Grid item xs={2.5} className={classes.root} textAlign="center">
        {/* TODO: Update when implement HOC cancel selling */}
        <Button className={classes.cancelBtn}>{getLabel("lCancelSelling")}</Button>
      </Grid>
    </>
  );
};

type TransactionItemProps = {
  idTransaction: string;
  quantity: number;
  price: number;
  date: number;
};

export default TransactionItem;

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    padding: theme.spacing(1.125, 2),
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
  },
  cancelBtn: {
    ...theme.typography?.body1,
    minWidth: 120,
    height: 27,
    textTransform: "unset",
    padding: 0,
    color: theme.palette.light.light3,
    backgroundColor: theme.palette.error.light3,
    "&:hover": {
      color: theme.palette.light.light3,
      backgroundColor: theme.palette.error.light3,
    },
  },
}));
