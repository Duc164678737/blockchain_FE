import React, { memo } from "react";
import { makeStyles } from "@mui/styles";
import { Tab, TabProps, ButtonProps } from "@mui/material";
import { ThemeProps } from "models/types";
import clsx from "clsx";

const AppTab = ({ label, classes, ...otherProps }: AppTabProps) => {
  const defaultClasses = useStyles();

  return (
    <Tab
      label={label}
      classes={{
        ...classes,
        root: clsx(defaultClasses.tabRoot, classes?.root),
        selected: clsx(defaultClasses.selected, classes?.selected),
      }}
      disableRipple
      disableFocusRipple
      {...otherProps}
    />
  );
};

type AppTabProps = TabProps & ButtonProps;

export default memo(AppTab);

const useStyles = makeStyles((theme: ThemeProps) => ({
  tabRoot: {
    ...theme.typography?.subtitle1,
    minHeight: 41,
    color: theme.palette.light.light5,
    padding: theme.spacing(0, 2),
    textTransform: "capitalize",
    "&:hover": {
      textDecoration: "unset",
    },
  },
  selected: {
    "&$selected": {
      color: theme.palette.primary.main,
    },
  },
}));
