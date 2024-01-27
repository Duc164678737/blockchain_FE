import React, { memo } from "react";
import { Box, Radio, RadioProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import clsx from "clsx";
import { RadioIcon } from "components/icons";

const AppRadio = ({ classes, iconProps = {}, ...otherProps }: AppRadioProps) => {
  const defaultClasses = useStyles();

  const { checkedIconClassName, iconClassName } = iconProps;

  return (
    <Radio
      classes={{
        ...classes,
        root: clsx(defaultClasses.root, classes?.root),
        checked: clsx(defaultClasses.checked, classes?.checked),
        disabled: clsx(defaultClasses.disabled, classes?.disabled),
      }}
      checkedIcon={<RadioIcon className={clsx(defaultClasses.iconChecked, checkedIconClassName)} />}
      icon={<Box className={clsx(defaultClasses.icon, iconClassName)} />}
      {...otherProps}
    />
  );
};

type AppRadioProps = RadioProps & {
  iconProps?: {
    iconClassName?: string;
    checkedIconClassName?: string;
  };
};

export default memo(AppRadio);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    width: 24,
    height: 24,
    background: theme.palette.grey[5],
    border: `1px solid ${theme.palette.light.light5}`,
  },
  checked: {
    background: "unset",
    border: `1px solid ${theme.palette.primary.main}`,
    "&$disabled": {
      background: theme.palette.dark.dark3,
      border: `1px solid ${theme.palette.dark.dark5}`,
      "&>$iconChecked": {
        color: theme.palette.dark.dark5,
      },
    },
  },
  disabled: {
    background: theme.palette.dark.dark3,
    border: `1px solid ${theme.palette.dark.dark5}`,
  },
  iconChecked: {
    fontSize: 12,
    color: theme.palette.primary.main,
  },
  icon: {
    borderRadius: "50%",
  },
}));
