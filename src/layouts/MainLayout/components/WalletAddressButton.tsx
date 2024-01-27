import React, { useState } from "react";
import { FormatUtils } from "utils";
import { ImageConstant } from "const";
import { makeStyles } from "@mui/styles";
import { useAuthContext } from "context";
import { ThemeProps } from "models/types";
import { LogoutIcon } from "components/icons";
import { useTranslation } from "react-i18next";
import { Box, Menu, MenuItem } from "@mui/material";
import { AppImage, AppTypography } from "components/common";
import clsx from "clsx";

const WalletAddressButton = () => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation();
  const { walletAddress, handleLogout } = useAuthContext();

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [isClicked, setIsClicked] = useState(false);

  const handleOpenMenu = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setIsClicked(false);
  };

  return (
    <>
      <Box
        className={clsx("center-vertical-root", classes.buttonWrapper)}
        onClick={(e) => {
          handleOpenMenu(e);
          setIsClicked(!isClicked);
        }}
      >
        <Box className={clsx("center-root", classes.avatarWrapper)}>
          <AppImage src={ImageConstant.DefaultAvatarImage} width={34} height={34} />
        </Box>
        <AppTypography variant="body2" sx={{ color: "dark.main", fontWeight: 500 }}>
          {FormatUtils.truncateHash(walletAddress)}
        </AppTypography>
        {isClicked && <Box className={classes.overlayBackground} />}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        classes={{
          list: classes.menuList,
          paper: classes.menuPaper,
        }}
      >
        <MenuItem
          classes={{ root: classes.menuItemRoot }}
          onClick={() => {
            handleLogout();
            handleCloseMenu();
          }}
        >
          <LogoutIcon className={classes.logoutIcon} />
          <AppTypography>{getLabel("lLogout")}</AppTypography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default WalletAddressButton;

const useStyles = makeStyles((theme: ThemeProps) => ({
  buttonWrapper: {
    width: 150,
    height: 40,
    borderRadius: 8,
    cursor: "pointer",
    position: "relative",
    background: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.light4}`,
  },
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: theme.spacing(1.5),
    background: theme.palette.gradient.secondary,
  },
  overlayBackground: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    position: "absolute",
    background: "rgba(0, 0, 0, 0.8)",
  },
  menuList: {
    padding: 0,
    background: "transparent",
  },
  menuPaper: {
    minWidth: 150,
    borderRadius: 8,
    width: "fit-content",
    backdropFilter: "blur(2px)",
    background: "rgba(35, 25, 97, 0.86)",
  },
  menuItemRoot: {
    "&$menuItemRoot": {
      width: "100%",
      display: "flex",
      alignItem: "center",
      justifyContent: "space-between",
      padding: theme.spacing(1.5, 3.5),

      "&, &:hover": {
        background: "transparent",
      },
    },
  },
  logoutIcon: {
    fontSize: 24,
    color: "transparent",
    stroke: theme.palette.text.primary,
  },
}));
