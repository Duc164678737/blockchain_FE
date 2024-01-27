import React, { memo } from "react";
import { Input, InputProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import clsx from "clsx";

const AppInput = ({ classes, ...otherProps }: InputProps) => {
  const defaultClasses = useStyles();

  return (
    <Input
      classes={{
        ...classes,
        root: clsx(defaultClasses.root, classes?.root),
        input: clsx(defaultClasses.inputRoot, classes?.input),
        focused: clsx(defaultClasses.focused, classes?.focused),
        disabled: clsx(defaultClasses.disabled, classes?.disabled),
      }}
      fullWidth
      {...otherProps}
    />
  );
};

export default memo(AppInput);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    ...theme.typography?.body2,
    border: "1px solid rgba(255, 255, 255, 0.03)",
    padding: 0,
    borderRadius: 8,
    color: "#ECECEC",
    background: theme.palette.grey[800],
    "&:after, &:before": {
      display: "none",
    },
    "&:hover": {
      borderColor: theme.palette.grey[50],
    },
  },
  inputRoot: {
    padding: theme.spacing(1.375, 2.25),
    minHeight: 24,
    borderRadius: 8,
    "&:focus": {
      border: "1px solid rgba(255, 255, 255, 0.03)",
      borderRadius: 6,
      padding: theme.spacing(1.125, 2),
    },
  },
  focused: {
    "&$focused": {
      border: "2px solid rgba(255, 211, 46, 0.4)",
    },
  },
  disabled: {
    background: "transparent",
    pointerEvents: "none",
    "&$inputRoot": {
      background: theme.palette.grey[50],
      textFillColor: "#575757",
    },
    "&:hover": {
      border: "1px solid rgba(255, 255, 255, 0.03)",
    },
  },
}));
