import React, { memo, useMemo } from "react";
import { Button, ListItemIcon, MenuItem, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  ArrowIcon,
  CartIcon,
  ControlIcon,
  InventoryGradientIcon,
  WalletIcon,
} from "components/icons";
import { PathConstant } from "const";
import { ObjectMultiLanguageProps, ThemeProps } from "models/types";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import SideBarItem from "./SideBarItem";
import clsx from "clsx";
import { useAuthContext } from "context";

const MenuInventory = ({ onClickBackButton, isCollapsible }: MenuInventoryProps) => {
  const classes = useStyles();
  const router = useRouter();
  const { t: getLabel } = useTranslation();
  const { hasAccessToken } = useAuthContext();
  const objSubListSideBar: ObjectMultiLanguageProps = getLabel("objSubListSideBar", {
    returnObjects: true,
  });

  const listItem = useMemo(() => getMenuList(getLabel, router.pathname), [getLabel, router]);

  return (
    <Stack>
      <Button
        onClick={onClickBackButton}
        classes={{ root: classes.backBtn, startIcon: classes.iconBtn }}
        startIcon={<ArrowIcon />}
      >
        {getLabel("lBack")}
      </Button>
      <SideBarItem
        className={classes.sidebar}
        checkedIcon={<InventoryGradientIcon />}
        startIcon={<InventoryGradientIcon />}
        selected={true}
      >
        {objSubListSideBar.lInventory}
      </SideBarItem>
      {listItem.map((item, index) => (
        <MenuItem
          classes={{ root: classes.menuListItem, selected: classes.itemSelected }}
          key={index}
          onClick={() => router.push(item.value)}
          selected={item.selected}
          disabled={!hasAccessToken && item.value === PathConstant.INVENTORY_IN_GAME_CARD}
          disableRipple
        >
          <ListItemIcon
            className={clsx(classes.startIcon, item.selected && classes.startIconChecked)}
          >
            {item.startIcon}
          </ListItemIcon>
          {!isCollapsible && item.label}
        </MenuItem>
      ))}
    </Stack>
  );
};

type MenuInventoryProps = {
  isCollapsible: boolean;

  onClickBackButton: () => void;
};

export default memo(MenuInventory);

const getMenuList = (
  getLabel: (key: string, obj: object) => ObjectMultiLanguageProps,
  currentPath: string,
) => {
  const itemListObj = getLabel("objMenuInventory", { returnObjects: true });

  return [
    {
      icon: <ArrowIcon />,
      label: itemListObj.lSelling,
      value: PathConstant.INVENTORY_SELLING_CARD,
      selected: [
        PathConstant.INVENTORY_SELLING_CARD,
        PathConstant.INVENTORY_SELLING_BOX,
        PathConstant.INVENTORY_SELLING_EMOTE,
        PathConstant.INVENTORY_SELLING_TOWER_SKIN,
      ].includes(currentPath),
      startIcon: <CartIcon />,
    },
    {
      icon: <ArrowIcon />,
      label: itemListObj.lInGame,
      value: PathConstant.INVENTORY_IN_GAME_CARD,
      selected: [
        PathConstant.INVENTORY_IN_GAME_CARD,
        PathConstant.INVENTORY_IN_GAME_BOX,
        PathConstant.INVENTORY_IN_GAME_EMOTE,
        PathConstant.INVENTORY_IN_GAME_TOWER_SKIN,
      ].includes(currentPath),
      startIcon: <ControlIcon />,
    },
    {
      icon: <ArrowIcon />,
      label: itemListObj.lWallet,
      value: PathConstant.INVENTORY_WALLET_CARD,
      selected: [
        PathConstant.INVENTORY_WALLET,
        PathConstant.INVENTORY_WALLET_CARD,
        PathConstant.INVENTORY_WALLET_CARD_DETAIL,
        PathConstant.INVENTORY_WALLET_BOX,
        PathConstant.INVENTORY_WALLET_BOX_DETAIL,
        PathConstant.INVENTORY_WALLET_EMOTE,
        PathConstant.INVENTORY_WALLET_EMOTE_DETAIL,
        PathConstant.INVENTORY_WALLET_TOWER_SKIN,
        PathConstant.INVENTORY_WALLET_TOWER_SKIN_DETAIL,
      ].includes(currentPath),
      startIcon: <WalletIcon />,
    },
  ];
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  backBtn: {
    ...theme.typography?.body2,
    fontWeight: 500,
    textTransform: "capitalize",
    height: 28,
    minWidth: 70,
    width: "fit-content",
    color: theme.palette.light.light5,
    background: theme.palette.grey[850],
    borderRadius: 8,
    padding: theme.spacing(0.25, 1),
    "&:hover": {
      background: theme.palette.grey[850],
    },
  },
  iconBtn: {
    "&$iconBtn": {
      marginLeft: 0,
      marginRight: theme.spacing(0.75),
      transform: "rotate(180deg)",
      "&>*:nth-of-type(1)": {
        fontSize: 16,
      },
    },
  },
  sidebar: {
    margin: theme.spacing(2.25, 0, 3),
    pointerEvents: "none",
  },
  startIcon: {
    "&$startIcon": {
      fontSize: 20,
      minWidth: 28,
    },
  },
  menuListItem: {
    minHeight: 36,
    fontWeight: 500,
    borderRadius: 8,
    padding: theme.spacing(0.75, 1.5),
    "&:hover": {
      backgroundColor: "unset",
    },
  },
  itemSelected: {
    "&$itemSelected": {
      color: theme.palette.primary.light2,
      backgroundColor: "unset",
      "&:hover": {
        backgroundColor: "unset",
      },
    },
  },
  startIconChecked: {
    color: theme.palette.primary.light2,
  },
}));
