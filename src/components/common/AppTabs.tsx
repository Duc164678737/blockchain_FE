import React, { memo } from "react";
import { Tabs, TabsProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";

const AppTabs = ({ children, classes, ...otherProps }: TabsProps) => {
  const defaultClasses = useStyles();

  return (
    <Tabs
      classes={{
        ...classes,
        root: clsx(defaultClasses.root, classes?.root),
        flexContainer: clsx(defaultClasses.flexContainer, classes?.flexContainer),
        indicator: clsx(defaultClasses.indicator, classes?.indicator),
      }}
      {...otherProps}
    >
      {children}
    </Tabs>
  );
};

export default memo(AppTabs);

const useStyles = makeStyles({
  root: {
    display: "flex",
    minHeight: 36,
  },
  flexContainer: {
    height: "100%",
  },
  indicator: {
    height: 1,
  },
});
