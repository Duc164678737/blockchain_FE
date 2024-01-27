import React, { memo } from "react";
import { ThemeProps } from "models/types";
import { makeStyles } from "@mui/styles";
import { DialogActions, DialogActionsProps } from "@mui/material";
import clsx from "clsx";

const AppModalActions = ({ className, ...otherProps }: DialogActionsProps) => {
  const classes = useStyles();

  return <DialogActions className={clsx(classes.root, className)} {...otherProps} />;
};

export default memo(AppModalActions);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    justifyContent: "center",
    padding: theme.spacing(0, 4, 4),
  },
}));
