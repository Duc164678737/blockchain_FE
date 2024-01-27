import React, { memo } from "react";
import { Link, LinkProps, Stack, StackProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppImage, AppTypography } from "components/common";
import { ImageConstant } from "const";
import { ThemeProps } from "models/types";
import clsx from "clsx";

const Logo = ({ className, isCollapsible, ...otherProps }: LogoProps) => {
  const classes = useStyles();

  return (
    <Stack
      component={Link}
      href="/"
      className={clsx(classes.root, className)}
      direction="row"
      spacing={1}
      underline="none"
      {...otherProps}
    >
      <AppImage width={48} height={48} src={ImageConstant.LogoImage} />
      <AppTypography className={clsx(classes.text, isCollapsible && classes.hiddenText)}>
        {APP_TITLE}
      </AppTypography>
    </Stack>
  );
};

type LogoProps = StackProps &
  LinkProps & {
    isCollapsible?: boolean;
  };

const APP_TITLE = "TZU";

export default memo(Logo);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    width: "fit-content",
    alignItems: "center",
  },
  text: {
    fontFamily: "Russo One",
    fontWeight: 400,
    fontSize: 40,
    width: 90,
    lineHeight: "48px",
    background: theme.palette.gradient.secondary,
    transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    "-webkit-background-clip": "text",
    "-webkit-text-fill-color": "transparent",
  },
  hiddenText: {
    "&$hiddenText": {
      width: 0,
      overflow: "hidden",
      marginLeft: 0,
    },
  },
}));
