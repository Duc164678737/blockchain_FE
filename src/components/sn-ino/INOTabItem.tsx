import React, { memo } from "react";
import { Tab, TabProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppLink, AppLinkProps, AppTypography } from "components/common";
import clsx from "clsx";

const INOTabItem = ({ label, classes, ...otherProps }: InoTabItemProps) => {
  const defaultClasses = useStyles();

  return (
    <Tab
      LinkComponent={AppLink}
      label={<AppTypography className={defaultClasses.text}>{label}</AppTypography>}
      classes={{
        ...classes,
        root: clsx(defaultClasses.tabRoot, classes?.root),
        selected: clsx(defaultClasses.selected, classes?.selected),
      }}
      {...otherProps}
    />
  );
};

type InoTabItemProps = TabProps & AppLinkProps;

export default memo(INOTabItem);

const useStyles = makeStyles((theme: ThemeProps) => ({
  text: {
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "24px",
    textTransform: "capitalize",
  },
  tabRoot: {
    width: 142,
    minHeight: 35,
    marginRight: 3,
    padding: 0,
    background: theme.palette.secondary.light3,
    boxShadow: `inset 0px -0.714286px 1.42857px ${theme.palette.grey[400]}, inset 0px 0px 2.85714px ${theme.palette.grey[10]}`,
    borderRadius: "4px 4px 0px 0px",
    "& $text": {
      background: theme.palette.gradient.hover,
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",
    },
    "&:hover": {
      textDecoration: "unset",
    },
  },
  selected: {
    "&$selected": {
      background: theme.palette.gradient.primary1,
      boxShadow: `0px 0px 4px ${theme.palette.grey[300]}`,
      borderRadius: "5px 5px 0px 0px",
      minHeight: 38,
      width: 148,
      position: "relative",
      zIndex: 1,
      "& $text": {
        color: theme.palette.dark.main,
        background: "unset",
        "-webkit-text-fill-color": "unset",
      },
      "&:before": {
        content: '""',
        position: "absolute",
        top: 3,
        left: 3,
        background: theme.palette.gradient.primary2,
        width: "calc(100% - 6px)",
        height: "calc(100% - 3px)",
        borderRadius: "4px 4px 0px 0px",
        boxShadow: `inset 0px -0.714286px 1.42857px ${theme.palette.grey[400]}, inset 0px 0px 2.85714px ${theme.palette.grey[10]}`,
        zIndex: -1,
      },
    },
  },
}));
