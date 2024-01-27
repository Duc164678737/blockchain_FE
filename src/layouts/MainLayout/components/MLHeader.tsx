import React from "react";
import { useAuthContext } from "context";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { AppBar, Box, Stack } from "@mui/material";
import { WIDTH_SIDE_BAR_IN_PX, WIDTH_COLLAPSIBLE_SIDE_BAR_IN_PX } from "./SideBar";
import ConnectWalletButton from "./ConnectWalletButton";
import WalletAddressButton from "./WalletAddressButton";
import ConnectWalletDrawer from "./ConnectWalletDrawer";
import clsx from "clsx";
import TokenPrice from "./TokenPrice";
import AppBreadcrumbs from "./AppBreadcrumbs";

const MLHeader = ({ isCollapsible }: MLHeaderProps) => {
  const classes = useStyles();

  const { isWalletConnected } = useAuthContext();

  return (
    <AppBar className={clsx(classes.appBar, isCollapsible && classes.largeAppBar)}>
      <Box className={clsx("center-vertical-root", classes.container)}>
        <Box className="space-between-root" width="100%">
          <AppBreadcrumbs />
          <Stack direction="row" spacing={3} alignItems="center">
            <TokenPrice />
            {isWalletConnected ? <WalletAddressButton /> : <ConnectWalletButton />}
          </Stack>
        </Box>
      </Box>
      <ConnectWalletDrawer />
    </AppBar>
  );
};

type MLHeaderProps = {
  isCollapsible: boolean;
};

export default MLHeader;
export const HEADER_HEIGHT_IN_PX = 72;

const useStyles = makeStyles((theme: ThemeProps) => ({
  appBar: {
    position: "fixed",
    left: WIDTH_SIDE_BAR_IN_PX,
    width: `calc(100vw - ${WIDTH_SIDE_BAR_IN_PX}px)`,
    height: HEADER_HEIGHT_IN_PX,
    background: theme.palette.secondary.light5,
    boxShadow: "unset",
    transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  },
  largeAppBar: {
    width: `calc(100vw - ${WIDTH_COLLAPSIBLE_SIDE_BAR_IN_PX}px)`,
    left: WIDTH_COLLAPSIBLE_SIDE_BAR_IN_PX,
  },
  container: {
    height: HEADER_HEIGHT_IN_PX,
    padding: theme.spacing(0, 7.5, 0, 3),
  },
}));
