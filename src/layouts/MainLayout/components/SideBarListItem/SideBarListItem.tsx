import React, { Fragment, memo, useEffect, useMemo, useState } from "react";
import { ObjectMultiLanguageProps } from "models/types";
import { IconButton, Stack, StackProps } from "@mui/material";
import {
  BagGradientIcon,
  BagIcon,
  BoxGradientIcon,
  BoxIcon,
  CaretIcon,
  GiftGradientIcon,
  GiftIcon,
  SpecialGiftIcon,
  UserGradientIcon,
  UserIcon,
} from "components/icons";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import { AppConstant, PathConstant } from "const";
import { useRouter } from "next/router";
import SideBarItem from "./SideBarItem";
import ComingSoonLabel from "./ComingSoonLabel";
import SubMenuList from "./SubMenuList";
import MenuInventory from "./MenuInventory";
import { useAuthContext } from "context";
import { MODAL_TYPES, useGlobalModalContext } from "context/GlobalModalContext";
import clsx from "clsx";
import Cookie from "js-cookie";

const SideBarListItem = ({ isCollapsible, ...otherProps }: SideBarListItemProps) => {
  const classes = useStyles();
  const router = useRouter();
  const { t: getLabel } = useTranslation();
  const { isWalletConnected } = useAuthContext();
  const { showGlobalModal, closeGlobalModal } = useGlobalModalContext();
  const signature = Cookie.get(AppConstant.KEY_SIGNATURE);

  const [isShowListItem, setIsShowListItem] = useState(false);
  const [isShowInventoryMenu, setIsShowInventoryMenu] = useState(false);

  const itemList = useMemo(
    () => getItemListSideBar(getLabel, router.pathname),
    [getLabel, router.pathname],
  );

  const handleClickItem = (path: string) => {
    if (path === PathConstant.PROFILE) {
      setIsShowListItem(!isShowListItem);
      return;
    }
    if (
      (path.includes(PathConstant.INVENTORY) || path.includes(PathConstant.PROFILE)) &&
      !isWalletConnected
    ) {
      handleOpenNoticeConnectModal();
    }
    if (path === PathConstant.INVENTORY && isWalletConnected) {
      setIsShowInventoryMenu(true);
      return;
    }

    router.push(path);
  };

  const handleOpenNoticeConnectModal = () => {
    showGlobalModal(MODAL_TYPES.noticeModal, {
      modalTitleProps: { title: getLabel("lError") },
      modalContentProps: {
        content: getLabel("msgNeedConnect"),
      },
      onSubmit: closeGlobalModal,
    });
  };

  useEffect(() => {
    setIsShowInventoryMenu(false);
    setIsShowListItem(false);
  }, [signature]);

  return (
    <Stack {...otherProps}>
      {isShowInventoryMenu ? (
        <MenuInventory
          isCollapsible={isCollapsible}
          onClickBackButton={() => setIsShowInventoryMenu(false)}
        />
      ) : (
        <>
          {itemList.map((item, index) => (
            <SideBarItem
              key={index}
              isCollapsible={isCollapsible}
              onClick={() => handleClickItem(item.path)}
              iconProps={{
                endIconClassName: clsx(
                  index === itemList.length - 1 && isShowListItem && classes.rotateIcon,
                ),
              }}
              {...item}
            >
              {item.label}
            </SideBarItem>
          ))}
          {isShowListItem && !isCollapsible && <SubMenuList onClickItem={handleClickItem} />}
        </>
      )}
    </Stack>
  );
};

type SideBarListItemProps = StackProps & {
  isCollapsible: boolean;
};

export default memo(SideBarListItem);

const ArrowIcon = () => {
  const classes = useStyles();

  return (
    <IconButton className={classes.iconRoot} disableRipple>
      <CaretIcon />
    </IconButton>
  );
};

const getItemListSideBar = (
  getLabel: (key: string, obj: object) => ObjectMultiLanguageProps,
  currentPath: string,
) => {
  const itemListObj = getLabel("objItemListSideBar", { returnObjects: true });

  return [
    {
      startIcon: <BagIcon />,
      checkedIcon: <BagGradientIcon />,
      label: itemListObj.lMarketplace,
      path: PathConstant.MARKETPLACE,
      selected: [
        PathConstant.MARKETPLACE,
        PathConstant.MARKETPLACE_CARD,
        PathConstant.MARKETPLACE_CARD_DETAIL,
        PathConstant.MARKETPLACE_BOX,
        PathConstant.MARKETPLACE_BOX_DETAIL,
        PathConstant.MARKETPLACE_EMOTE,
        PathConstant.MARKETPLACE_EMOTE_DETAIL,
        PathConstant.MARKETPLACE_TOWER_SKIN,
        PathConstant.MARKETPLACE_TOWER_SKIN_DETAIL,
      ].includes(currentPath),
    },
    {
      startIcon: <BoxIcon />,
      checkedIcon: <BoxGradientIcon />,
      label: itemListObj.lINO,
      path: PathConstant.INO,
      selected: [PathConstant.INO_FCFS, PathConstant.INO_WHITELIST, PathConstant.INO].includes(
        currentPath,
      ),
    },
    {
      startIcon: <GiftIcon />,
      checkedIcon: <GiftGradientIcon />,
      label: itemListObj.lClaim,
      path: PathConstant.CLAIM,
      selected: [PathConstant.CLAIM, PathConstant.CLAIM_DETAIL].includes(currentPath),
    },
    {
      startIcon: <SpecialGiftIcon />,
      checkedIcon: <Fragment />,
      endIcon: <ComingSoonLabel />,
      label: itemListObj.lSpecialEvent,
      path: "#",
      disabled: true,
    },
    {
      startIcon: <UserIcon />,
      endIcon: <ArrowIcon />,
      checkedIcon: <UserGradientIcon />,
      path: PathConstant.PROFILE,
      label: itemListObj.lProfile,
      selected: [
        PathConstant.PROFILE,
        PathConstant.PROFILE_MY_GAME_WALLET,
        PathConstant.PROFILE_ACCOUNT_SETTING,
      ].includes(currentPath),
    },
  ];
};

const useStyles = makeStyles(() => ({
  iconRoot: {
    width: 24,
    height: 24,
    transform: "rotate(-90deg)",
  },
  rotateIcon: {
    transform: "rotate(180deg)",
  },
}));
