import React, { Fragment, memo, useMemo } from "react";
import { AppTypographyProps, ThemeProps } from "models/types";
import { AppTypography } from "components/common";
import {
  Snackbar,
  Box,
  SnackbarProps,
  SnackbarClasses,
  Stack,
  IconButton,
  IconButtonProps,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { SuccessIcon, ErrorIcon, CloseIcon } from "components/icons";
import clsx from "clsx";
import { AppConstant } from "const";

const AppSnackbar = ({
  onClose,
  contentProps = {},
  closeIconProps = {},
  status,
  classes,
  className,
  ...otherProps
}: AppSnackbarProps) => {
  const defaultClasses = useStyles();

  const { message, titleLabel, messageProps, titleProps } = contentProps;
  const { classes: closeIconClassName, ...otherCloseIconProps } = closeIconProps;

  const statusIcon = useMemo(() => {
    switch (status) {
      case AppConstant.SNACKBAR_STATUS.success:
        return (
          <SuccessIcon
            className={clsx(defaultClasses.successIcon, classes?.iconClassName)}
            key="success-icon"
          />
        );

      case AppConstant.SNACKBAR_STATUS.error:
        return (
          <ErrorIcon
            className={clsx(defaultClasses.errorIcon, classes?.iconClassName)}
            key="failed-icon"
          />
        );

      default:
        return <Fragment />;
    }
  }, [status]);

  return (
    <Snackbar
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={5000}
      classes={{
        ...classes,
        root: clsx(
          defaultClasses.root,
          status === AppConstant.SNACKBAR_STATUS.success && defaultClasses.successSnackbarRoot,
          status === AppConstant.SNACKBAR_STATUS.error && defaultClasses.errorSnackbarRoot,
          classes?.root,
        ),
      }}
      {...otherProps}
    >
      <Box className={clsx(defaultClasses.contentWrapper, className)}>
        {statusIcon}
        <Stack spacing={1} className={defaultClasses.snackbarTypography}>
          <AppTypography variant="h6" fontSize="20px" {...titleProps}>
            {titleLabel}
          </AppTypography>
          <AppTypography lineHeight="18px" color="text.light8" {...messageProps}>
            {message}
          </AppTypography>
        </Stack>
        <IconButton
          onClick={onClose}
          className={clsx(defaultClasses.closeIconButton, closeIconClassName)}
          {...otherCloseIconProps}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Snackbar>
  );
};

type AppSnackbarProps = SnackbarProps & {
  status: AppConstant.SNACKBAR_STATUS;
  contentProps: {
    message?: string;
    titleLabel?: string;
    titleProps?: AppTypographyProps;
    messageProps?: AppTypographyProps;
  };
  closeIconProps?: IconButtonProps;
  classes?: SnackbarClasses & {
    iconClassName?: string;
  };

  onClose: () => void;
};

export default memo(AppSnackbar);

const useStyles = makeStyles<ThemeProps>((theme) => ({
  "@global": {
    "@keyframes fade": {
      "0%": {
        width: "100%",
      },
      "100%": {
        width: 0,
      },
    },
  },
  root: {
    top: 16,
    width: 445,
    minHeight: 105,
    justifyContent: "flex-start",
    background: theme.palette.alert.main,
    padding: theme.spacing(0, 0, 2.5, 2.75),
    border: `1px solid ${theme.palette.grey[800]}`,
    borderRadius: 8,
    overflow: "hidden",
    backdropFilter: "blur(2px)",

    "&:after": {
      content: "''",
      height: 4,
      bottom: 1,
      left: 1,
      position: "absolute",
      animation: "fade linear 5s",
      animationIterationCount: 1,
    },
  },
  successSnackbarRoot: {
    "&:after": {
      background: theme.palette.success.light4,
    },
  },
  errorSnackbarRoot: {
    "&:after": {
      background: theme.palette.error.light5,
    },
  },
  contentWrapper: {
    width: "100%",
    display: "flex",
  },
  closeIconButton: {
    width: 36,
  },
  snackbarTypography: {
    flex: 1,
    margin: theme.spacing(2, 0, 0, 2.75),
  },
  errorIcon: {
    marginTop: theme.spacing(3),
    fontSize: 40,
    color: theme.palette.error.light4,
  },
  successIcon: {
    marginTop: theme.spacing(3),
    fontSize: 40,
    color: theme.palette.success.light3,
  },
}));
