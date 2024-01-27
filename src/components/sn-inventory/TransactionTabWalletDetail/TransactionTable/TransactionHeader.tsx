import React, { memo } from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppTypography } from "components/common";
import { ThemeProps } from "models/types";
import { useTranslation } from "react-i18next";

const TransactionHeader = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  return (
    <>
      <Grid item xs={2.5} className={classes.root}>
        <AppTypography variant="subtitle1">{getLabel("lID")}</AppTypography>
      </Grid>
      <Grid item xs={2} textAlign="center" className={classes.root}>
        <AppTypography variant="subtitle1">{getLabel("lQuantity")}</AppTypography>
      </Grid>
      <Grid item xs={2.5} textAlign="center" className={classes.root}>
        <AppTypography variant="subtitle1">{getLabel("lPrice")}</AppTypography>
      </Grid>
      <Grid item xs={2.5} className={classes.root}>
        <AppTypography variant="subtitle1">{getLabel("lDate")}</AppTypography>
      </Grid>
      <Grid item xs={2.5} textAlign="center" className={classes.root}>
        <AppTypography variant="subtitle1">{getLabel("lAction")}</AppTypography>
      </Grid>
    </>
  );
};

export default memo(TransactionHeader);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    padding: theme.spacing(1.125, 2),
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
  },
}));
