import React, { memo } from "react";
import { makeStyles } from "@mui/styles";
import { AppTypography } from "components/common";
import { AppTypographyProps, ThemeProps } from "models/types";
import clsx from "clsx";

const AppModalTitle = ({ children, className, ...otherProps }: AppTypographyProps) => {
  const classes = useStyles();

  return (
    <AppTypography className={clsx(classes.root, className)} {...otherProps}>
      {children}
    </AppTypography>
  );
};

export default memo(AppModalTitle);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    padding: theme.spacing(2, 4),
    fontFamily: "Russo One",
    fontSize: 28,
    lineHeight: "32px",
    fontWeight: 400,
    background: theme.palette.modal.title,
    boxShadow: "0px 2px 4px rgba(75, 75, 75, 0.08)",
  },
}));
