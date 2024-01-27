import React, { memo, useMemo } from "react";
import { ThemeProps, ValueOf } from "models/types";
import { makeStyles } from "@mui/styles";
import { Link, Stack, StackProps } from "@mui/material";
import { AppTypography } from "components/common";
import { useTranslation } from "react-i18next";
import { ConnectorUtils, FormatUtils } from "utils";
import { AppConstant } from "const";
import LoadingStatus, { LoadingStatusProps } from "./LoadingStatus";
import clsx from "clsx";

const TransactionStatus = ({
  transactionHash,
  transactionStatus,
  className,
  stackWrapperProps = {},
  transactionLoadingStatusProps,
  ...otherProps
}: TransactionStatusProps) => {
  const classes = useStyles();
  const { className: stackWrapperClassName, ...otherStackWrapperProps } = stackWrapperProps;

  const { t: getLabel } = useTranslation();

  const { transactionHashProps, transactionLabel } = useMemo(() => {
    if (
      [
        AppConstant.TRANSACTION_STATUS_TYPE.failed,
        AppConstant.TRANSACTION_STATUS_TYPE.cancel,
      ].includes(transactionStatus) &&
      !transactionHash
    ) {
      return {
        transactionHashProps: {},
        transactionLabel: getLabel("lNoData"),
      };
    } else if (transactionHash) {
      return {
        transactionHashProps: {
          component: Link,
          href: ConnectorUtils.getTransactionUrl(transactionHash),
          target: "_blank",
          underline: "none",
        },
        transactionLabel: FormatUtils.truncateHash(transactionHash),
      };
    } else {
      return {
        transactionHashProps: {
          color: "info.light2",
        },
        transactionLabel: getLabel("lLoadingHaveDot"),
      };
    }
  }, [transactionHash, transactionStatus, getLabel]);

  return (
    <Stack className={clsx(classes.statusWrapper, className)} {...otherProps}>
      <Stack
        spacing={6}
        className={clsx(classes.root, stackWrapperClassName)}
        direction="row"
        {...otherStackWrapperProps}
      >
        <AppTypography minWidth={112} variant="body2">
          {getLabel("lTransactionHash")}
        </AppTypography>
        <AppTypography variant="body2" color="common.white" {...transactionHashProps}>
          {transactionLabel}
        </AppTypography>
      </Stack>
      <Stack
        spacing={6}
        mt={1}
        className={clsx(classes.root, stackWrapperClassName)}
        direction="row"
        {...otherStackWrapperProps}
      >
        <AppTypography minWidth={112} variant="body2">
          {getLabel("lStatus")}
        </AppTypography>
        <LoadingStatus
          variant={transactionStatus}
          transactionHash={transactionHash}
          {...transactionLoadingStatusProps}
        />
      </Stack>
    </Stack>
  );
};

export type TransactionStatusProps = StackProps & {
  transactionHash?: string;
  transactionStatus: ValueOf<typeof AppConstant.TRANSACTION_STATUS_TYPE>;
  stackWrapperProps?: StackProps;
  transactionLoadingStatusProps?: Pick<
    LoadingStatusProps,
    "iconProps" & "labelProps" & "loadingIconProps"
  >;
};

export default memo(TransactionStatus);

const useStyles = makeStyles((theme: ThemeProps) => ({
  statusWrapper: {
    width: "100%",
    minHeight: 80,
    backgroundColor: theme.palette.modal.title,
    borderRadius: 4,
    border: "2px solid",
    borderTopColor: "rgba(255, 255, 255, 0.04)",
    borderRightColor: "rgba(255, 255, 255, 0.025)",
    borderBottomColor: "rgba(255, 255, 255, 0.025)",
    borderLeftColor: "rgba(255, 255, 255, 0.04)",
    padding: theme.spacing(1.25, 13.125),
    marginTop: theme.spacing(2),
  },
  root: {
    width: "100%",
    alignItems: "center",
    color: theme.palette.light.light5,
  },
}));
