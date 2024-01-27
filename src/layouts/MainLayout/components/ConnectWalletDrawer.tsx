import React, { useMemo } from "react";
import { WalletConstant } from "const";
import { useAuthContext } from "context";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { Drawer, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AppImage, AppLink, AppTypography } from "components/common";
import clsx from "clsx";
import { ConnectorUtils } from "utils";

const ConnectWalletDrawer = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  const { isOpenConnectDrawer, handleToggleDrawer } = useAuthContext();

  return (
    <Drawer
      anchor="right"
      open={isOpenConnectDrawer}
      onClose={handleToggleDrawer}
      classes={{ paper: classes.paperDrawer }}
      ModalProps={{
        BackdropProps: {
          className: classes.backdropDrawer,
        },
      }}
    >
      <AppTypography variant="h4" className={classes.drawerTitle}>
        {getLabel("lSelectWallet")}
      </AppTypography>
      <AppTypography variant="body2" sx={{ mb: 3 }}>
        {getLabel("msgConnectDrawer")}
      </AppTypography>

      {WalletConstant.POLYGON_WALLET_OPTIONS.map((item, index) => {
        return (
          <WalletItem
            key={index}
            iconSrc={item.iconSrc}
            walletName={item.walletName}
            connectorId={item.connectorId}
          />
        );
      })}

      <AppLink
        href="#"
        underline="always"
        className={classes.linkConnect}
        onClick={handleToggleDrawer}
      >
        {getLabel("lLearnConnect")}
      </AppLink>
    </Drawer>
  );
};

export default ConnectWalletDrawer;

const WalletItem = ({ iconSrc, walletName, connectorId }: WalletItemProps) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();

  const {
    handleLogin,
    isWalletConnected,
    isChoosingAccounts,
    isWalletConnecting,
    isSwitchingAccount,
  } = useAuthContext();

  const currentConnectedId = ConnectorUtils.getCurrentConnectorId();

  const statusConnectLabel = useMemo(() => {
    if (isChoosingAccounts) {
      return getLabel("msgChoosingAccounts");
    } else if (isWalletConnecting) {
      return getLabel("msgConnectingWallet");
    } else if (isSwitchingAccount) {
      return getLabel("msgSwitchingAccounts");
    } else if (isWalletConnected) {
      return "";
    }
  }, [isChoosingAccounts, isWalletConnecting, isSwitchingAccount]);

  const isShowStatus = useMemo(() => {
    return currentConnectedId === connectorId && statusConnectLabel;
  }, [currentConnectedId, statusConnectLabel, connectorId]);

  return (
    <Box
      className={clsx("center-vertical-root", classes.walletItemWrapper)}
      onClick={() => {
        handleLogin(connectorId);
      }}
    >
      <AppImage src={iconSrc} width={24} height={24} />
      <AppTypography sx={{ ml: 1.5 }} variant="h6">
        {walletName}
      </AppTypography>
      {isShowStatus && (
        <AppTypography variant="body2" className={classes.statusConnectText}>
          {statusConnectLabel}
        </AppTypography>
      )}
    </Box>
  );
};

type WalletItemProps = {
  iconSrc: string;
  walletName: string;
  connectorId: string;
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  backdropDrawer: {
    background: "transparent",
  },
  paperDrawer: {
    width: 400,
    boxShadow: "none",
    padding: theme.spacing(3, 4),
    backdropFilter: "blur(10px)",
    borderRadius: "12px 0px 0px 12px",
    background: "rgba(35, 25, 97, 0.86)",
  },
  drawerTitle: {
    fontWeight: 400,
    fontFamily: "Russo One",
  },
  linkConnect: {
    fontWeight: 500,
    color: theme.palette.text.primary,
    textDecorationColor: theme.palette.text.primary,
  },
  walletItemWrapper: {
    borderRadius: 8,
    cursor: "pointer",
    position: "relative",
    padding: theme.spacing(1.5, 3),
    marginBottom: theme.spacing(2),
    background: theme.palette.secondary.light7,
    border: `1px solid ${theme.palette.secondary.light6}`,
  },
  statusConnectText: {
    top: 4,
    right: 8,
    position: "absolute",
  },
}));
