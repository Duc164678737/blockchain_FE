import React, { memo, useMemo } from "react";
import { MenuItem, Stack, StackProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { PathConstant } from "const";
import { makeStyles } from "@mui/styles";
import { ObjectMultiLanguageProps, ThemeProps } from "models/types";
import { useRouter } from "next/router";

const SubMenuList = ({ onClickItem, ...otherProps }: SubMenuListProps) => {
  const classes = useStyles();
  const router = useRouter();
  const { t: getLabel } = useTranslation();

  const listItem = useMemo(() => getSubMenuList(getLabel, router.pathname), [getLabel, router]);

  return (
    <Stack spacing={1.5} {...otherProps}>
      {listItem.map((item, index) => (
        <MenuItem
          classes={{ root: classes.root, selected: classes.selected }}
          key={index}
          onClick={() => onClickItem(item.value)}
          {...item}
        >
          {item.label}
        </MenuItem>
      ))}
    </Stack>
  );
};

export default memo(SubMenuList);

type SubMenuListProps = StackProps & {
  onClickItem: (path: string) => void;
};

const getSubMenuList = (
  getLabel: (key: string, obj: object) => ObjectMultiLanguageProps,
  currentPath: string,
) => {
  const itemListObj = getLabel("objSubListSideBar", { returnObjects: true });

  return [
    {
      label: itemListObj.lMyGameWallet,
      value: PathConstant.PROFILE_MY_GAME_WALLET,
      selected: [PathConstant.PROFILE_MY_GAME_WALLET].includes(currentPath),
    },
    {
      label: itemListObj.lInventory,
      value: PathConstant.INVENTORY,
      selected: [
        PathConstant.INVENTORY,
        PathConstant.INVENTORY_SELLING,
        PathConstant.INVENTORY_SELLING_CARD,
        PathConstant.INVENTORY_SELLING_BOX,
        PathConstant.INVENTORY_SELLING_EMOTE,
        PathConstant.INVENTORY_SELLING_TOWER_SKIN,
        PathConstant.INVENTORY_IN_GAME,
        PathConstant.INVENTORY_IN_GAME_CARD,
        PathConstant.INVENTORY_IN_GAME_BOX,
        PathConstant.INVENTORY_IN_GAME_EMOTE,
        PathConstant.INVENTORY_IN_GAME_TOWER_SKIN,
        PathConstant.INVENTORY_WALLET,
        PathConstant.INVENTORY_WALLET_CARD,
        PathConstant.INVENTORY_WALLET_BOX,
        PathConstant.INVENTORY_WALLET_EMOTE,
        PathConstant.INVENTORY_WALLET_TOWER_SKIN,
      ].includes(currentPath),
    },
    {
      label: itemListObj.lAccountSetting,
      value: PathConstant.PROFILE_ACCOUNT_SETTING,
      selected: [PathConstant.PROFILE_ACCOUNT_SETTING].includes(currentPath),
    },
  ];
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    color: theme.palette.light.light5,
    padding: theme.spacing(1, 2),
    borderRadius: 8,
    "&:hover": {
      backgroundColor: theme.palette.grey[850],
    },
  },
  selected: {
    "&$selected": {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.grey[850],
      "&:hover": {
        backgroundColor: theme.palette.grey[850],
      },
    },
  },
}));
