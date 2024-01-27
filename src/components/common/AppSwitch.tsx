import React, { memo } from "react";
import { makeStyles } from "@mui/styles";
import { Switch, SwitchProps } from "@mui/material";
import { ThemeProps } from "models/types";
import clsx from "clsx";

const AppSwitch = ({ classes, ...otherProps }: SwitchProps) => {
  const defaultClasses = useStyles();

  return (
    <Switch
      classes={{
        ...classes,
        root: clsx(defaultClasses.root, classes?.root),
        switchBase: clsx(defaultClasses.switchBase, classes?.switchBase),
        checked: clsx(defaultClasses.checked, classes?.checked),
        track: clsx(defaultClasses.track, classes?.track),
        disabled: clsx(defaultClasses.disabled, classes?.disabled),
        thumb: clsx(defaultClasses.thumb, classes?.thumb),
      }}
      {...otherProps}
    />
  );
};

export default memo(AppSwitch);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    width: 48,
    height: 24,
    padding: 0,
  },
  track: {
    "&$track": {
      borderRadius: 24,
      height: 24,
      background: "rgba(0, 0, 0, 0.04)",
      border: `1px solid ${theme.palette.light.light5}`,
      opacity: 1,
    },
  },
  disabled: {
    "&+$track$track": {
      background: theme.palette.dark.dark3,
      border: `1px solid ${theme.palette.dark.dark5}`,
      opacity: 1,
    },
  },
  switchBase: {
    color: theme.palette.light.light5,
    padding: theme.spacing(0.75),
    "&$disabled": {
      color: theme.palette.dark.dark5,
    },
  },
  checked: {
    "&$checked": {
      color: theme.palette.primary.main,
      "&$switchBase": {
        transform: "translateX(24px)",
      },
      "&+$track": {
        opacity: 1,
        background: "rgba(0, 0, 0, 0.04)",
        border: `1px solid ${theme.palette.primary.main}`,
      },
    },
    "&$disabled": {
      color: theme.palette.dark.dark5,
      "&$switchBase": {
        color: theme.palette.dark.dark5,
      },
      "&+$track$track": {
        background: theme.palette.dark.dark3,
        border: `1px solid ${theme.palette.dark.dark5}`,
        opacity: 1,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
  },
}));
