import React, { Fragment, memo, useMemo } from "react";
import { AppTypographyProps, IIconProps, ObjectMultiLanguageProps, ValueOf } from "models/types";
import { makeStyles } from "@mui/styles";
import { Stack, StackProps } from "@mui/material";
import { AppLoading, AppTypography, AppLoadingProps } from "components/common";
import { CompletedIcon, FailedIcon } from "components/icons";
import { useTranslation } from "react-i18next";
import { AppConstant } from "const";
import clsx from "clsx";

const LoadingStatus = ({
  variant,
  transactionHash,
  iconProps = {},
  labelProps = {},
  loadingIconProps = {},
  ...otherProps
}: LoadingStatusProps) => {
  const defaultClasses = useStyles();
  const { className: iconClassName, ...otherIconProps } = iconProps;

  const { t: getLabel } = useTranslation();
  const objLoadingLabels: ObjectMultiLanguageProps = getLabel("objLoadingStatus", {
    returnObjects: true,
  });

  const [StatusIcon, statusLabel] = useMemo(() => {
    switch (variant) {
      case AppConstant.TRANSACTION_STATUS_TYPE.complete:
        return [
          <CompletedIcon
            key="success"
            className={clsx(defaultClasses.icon, iconClassName)}
            sx={{ color: "success.light3" }}
            {...otherIconProps}
          />,
          <AppTypography
            variant="body2"
            color="tertiary.light2"
            key="success-label"
            {...labelProps}
          >
            {objLoadingLabels.lSuccess}
          </AppTypography>,
        ];
      case AppConstant.TRANSACTION_STATUS_TYPE.failed:
        return [
          <FailedIcon
            key="failed"
            className={clsx(defaultClasses.icon, iconClassName)}
            sx={{ color: "error.light3" }}
            {...otherIconProps}
          />,
          <AppTypography variant="body2" color="error.light3" key="failed-label" {...labelProps}>
            {objLoadingLabels.lFailed}
          </AppTypography>,
        ];
      case AppConstant.TRANSACTION_STATUS_TYPE.cancel:
        return [
          <Fragment key="box" />,
          <AppTypography variant="body2" color="error.light3" key="canceled-label" {...labelProps}>
            {objLoadingLabels.lCanceled}
          </AppTypography>,
        ];
      case AppConstant.TRANSACTION_STATUS_TYPE.loading:
        return [
          <AppLoading key="loading" {...loadingIconProps} />,
          <AppTypography
            variant="body2"
            color={transactionHash ? "primary.light3" : "info.light2"}
            key="loading-label"
            {...labelProps}
          >
            {transactionHash ? objLoadingLabels.lProcessing : objLoadingLabels.lConfirming}
          </AppTypography>,
        ];
      default:
        return [];
    }
  }, [variant, transactionHash, objLoadingLabels]);

  return (
    <Stack direction="row" alignItems="center" spacing={0.75} {...otherProps}>
      {StatusIcon}
      {statusLabel}
    </Stack>
  );
};

export type LoadingStatusProps = StackProps & {
  transactionHash?: string;
  variant: ValueOf<typeof AppConstant.TRANSACTION_STATUS_TYPE>;
  iconProps?: IIconProps;
  labelProps?: AppTypographyProps;
  loadingIconProps?: AppLoadingProps;
};

export default memo(LoadingStatus);

const useStyles = makeStyles({
  icon: {
    fontSize: 20,
  },
});
