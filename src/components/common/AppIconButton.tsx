import React, { memo } from "react";
import { Box, BoxProps, IconButton, IconButtonProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import clsx from "clsx";

const AppIconButton = ({
  className,
  children,
  wrapperProps = {},
  ...otherProps
}: AppIconButtonProps) => {
  const defaultClasses = useStyles();
  const { className: wrapperClassName, ...otherWrapperProps } = wrapperProps;

  return (
    <Box className={clsx(defaultClasses.iconBoxButton, wrapperClassName)} {...otherWrapperProps}>
      <IconButton className={clsx(defaultClasses.iconButton, className)} {...otherProps}>
        {children}
      </IconButton>
    </Box>
  );
};

type AppIconButtonProps = IconButtonProps & {
  wrapperProps?: BoxProps;
};

export default memo(AppIconButton);

const useStyles = makeStyles((theme: ThemeProps) => ({
  iconBoxButton: {
    width: "fit-content",
    paddingBottom: theme.spacing(0.5),
    background: theme.palette.gradient.primary,
    borderRadius: 8,
  },
  iconButton: {
    width: 40,
    height: 36,
    background: theme.palette.gradient.secondary,
    boxShadow: `inset 0px -1px 2px ${theme.palette.grey[400]}, inset 0px 0px 4px ${theme.palette.grey[10]}`,
    borderRadius: 8,
    padding: theme.spacing(0.75, 1),
  },
}));
