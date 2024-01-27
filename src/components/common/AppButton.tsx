import React, { memo, useMemo } from "react";
import { Box, BoxProps, Button, ButtonProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import clsx from "clsx";

const AppButton = ({
  children,
  disabled,
  variant,
  classes,
  wrapperProps = {},
  ...otherProps
}: AppButtonProps) => {
  const defaultClasses = useStyles();
  const { className: wrapperClassName, ...otherWrapperProps } = wrapperProps;

  const wrapperClassNameType = useMemo(() => {
    if (variant === BUTTON_TYPE.outline && !disabled) {
      return defaultClasses.outlineWrapper;
    } else if (variant === BUTTON_TYPE.contained) {
      return defaultClasses.containerWrapper;
    } else {
      return defaultClasses.disabledWrapper;
    }
  }, [disabled, variant]);

  return (
    <Box
      className={clsx(
        defaultClasses.wrapperRoot,
        wrapperClassNameType,
        disabled && defaultClasses.disabledWrapper,
        wrapperClassName,
      )}
      {...otherWrapperProps}
    >
      <Button
        classes={{
          ...classes,
          root: clsx(defaultClasses.root, classes?.root),
          disabled: clsx(defaultClasses.disabled, classes?.disabled),
          contained: clsx(defaultClasses.contained, classes?.contained),
          outlined: clsx(defaultClasses.outlined, classes?.outlined),
          text: clsx(defaultClasses.text, classes?.text),
        }}
        disabled={disabled}
        variant={variant}
        {...otherProps}
      >
        {children}
      </Button>
    </Box>
  );
};

const BUTTON_TYPE = {
  outline: "outlined",
  text: "text",
  contained: "contained",
};

export type AppButtonProps = ButtonProps & {
  wrapperProps?: BoxProps;
};

export default memo(AppButton);

const useStyles = makeStyles((theme: ThemeProps) => ({
  wrapperRoot: {
    width: "fit-content",
    borderRadius: 8,
    paddingBottom: theme.spacing(0.5),
  },
  containerWrapper: {
    background: theme.palette.gradient.primary,
  },
  outlineWrapper: {
    background: "transparent",
    padding: 0,
  },
  disabledWrapper: {
    background: theme.palette.gradient.disabledWrapper,
  },
  root: {
    fontSize: 20,
    fontWeight: 400,
    lineHeight: "24px",
    fontFamily: "Russo One",
    border: "unset",
    borderRadius: 8,
    minWidth: 118,
    minHeight: 44,
    padding: theme.spacing(1),
    textTransform: "unset",
  },
  disabled: {
    "&$disabled": {
      textShadow: `0px 1px 0px ${theme.palette.common.black}`,
      background: theme.palette.gradient.disabled,
      color: theme.palette.light.light5,
      boxShadow: `inset 0px -1px 2px ${theme.palette.grey[400]}, inset 0px 0px 4px rgba(0, 0, 0, 0.16)`,
      "-webkit-text-stroke": "unset",
    },
  },
  contained: {
    textShadow: `0px 1px 0px ${theme.palette.common.black}`,
    "-webkit-text-stroke": "0.5px #6013DB",
    background: theme.palette.gradient.secondary,
    boxShadow: `inset 0px -1px 2px ${theme.palette.grey[400]}, inset 0px 0px 4px ${theme.palette.grey[50]}`,
    "&:hover": {
      background: theme.palette.gradient.hover,
      boxShadow: `inset 0px -1px 2px ${theme.palette.grey[400]}, inset 0px 0px 4px ${theme.palette.grey[50]}`,
    },
  },
  outlined: {
    border: `4px solid ${theme.palette.primary.light7}`,
    color: theme.palette.primary.light6,
    "&:hover": {
      backgroundColor: theme.palette.dark.dark6,
      border: `4px solid ${theme.palette.primary.light7}`,
    },
  },
  text: {
    textShadow: `0px 1px 0px ${theme.palette.common.black}`,
    "-webkit-text-stroke": "0.5px #6013DB",
    color: theme.palette.common.white,
    background: theme.palette.gradient.disabled,
    boxShadow: `inset 0px -1px 2px ${theme.palette.grey[400]}, inset 0px 0px 4px rgba(0, 0, 0, 0.16)`,
    "&:hover": {
      background: theme.palette.gradient.ghostHover,
    },
  },
}));
