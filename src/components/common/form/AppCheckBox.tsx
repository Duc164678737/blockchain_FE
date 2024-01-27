import React, { Fragment, memo } from "react";
import { IIconProps, ThemeProps } from "models/types";
import { makeStyles } from "@mui/styles";
import { Checkbox, CheckboxProps } from "@mui/material";
import { CheckBoxIcon } from "components/icons";
import clsx from "clsx";

const AppCheckbox = ({ classes, checkedIconProps = {}, ...otherProps }: AppCheckboxProps) => {
  const defaultClasses = useStyles();
  const { className: checkedIconClassName, ...otherCheckedIconProps } = checkedIconProps;

  return (
    <Checkbox
      classes={{
        ...classes,
        root: clsx(defaultClasses.root, classes?.root),
        checked: clsx(defaultClasses.checked, classes?.checked),
        disabled: clsx(defaultClasses.disabled, classes?.disabled),
      }}
      icon={<Fragment />}
      checkedIcon={
        <CheckBoxIcon
          className={clsx(defaultClasses.checkedIcon, checkedIconClassName)}
          {...otherCheckedIconProps}
        />
      }
      {...otherProps}
    />
  );
};

type AppCheckboxProps = CheckboxProps & {
  checkedIconProps?: IIconProps;
};

export default memo(AppCheckbox);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    width: 24,
    height: 24,
    padding: 0,
    background: "rgba(0, 0, 0, 0.04)",
    border: `1px solid ${theme.palette.light.light5}`,
    borderRadius: 4,
  },
  checked: {
    border: "unset",
    background: theme.palette.gradient.secondary,
  },
  disabled: {
    background: theme.palette.dark.dark3,
    "&$checked": {
      background: theme.palette.gradient.disabled,
    },
  },
  checkedIcon: {
    color: "transparent",
    fontSize: 20,
    stroke: theme.palette.common.white,
  },
}));
