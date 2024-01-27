import React, { memo } from "react";
import { ThemeProps } from "models/types";
import { makeStyles } from "@mui/styles";
import { DialogContent, DialogContentProps } from "@mui/material";
import clsx from "clsx";

const AppModalContent = ({ children, className, ...otherProps }: DialogContentProps) => {
  const classes = useStyles();

  return (
    <DialogContent className={clsx(classes.root, className)} {...otherProps}>
      {children}
    </DialogContent>
  );
};

export default memo(AppModalContent);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    padding: theme.spacing(4, 4, 5),
    color: theme.palette.grey[250],
  },
}));
