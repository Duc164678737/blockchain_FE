import React, { memo, useMemo } from "react";
import { Breadcrumbs, BreadcrumbsProps } from "@mui/material";
import { AppLink, AppLinkProps, AppTypography } from "components/common";
import { ArrowIcon } from "components/icons";
import { makeStyles } from "@mui/styles";
import { AppTypographyProps, ThemeProps } from "models/types";
import { useRouter } from "next/router";
import { PathConstant } from "const";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const AppBreadcrumbs = ({ classes, ...otherProps }: AppBreadcrumbsProps) => {
  const defaultClasses = useStyles();
  const { t: getLabel } = useTranslation();

  const router = useRouter();

  const itemList = useMemo(() => {
    const pathnameList = router.pathname.split("/").slice(1);

    return pathnameList?.map((item, index) => {
      const label = item.replace("-", " ");
      const atLength: number = index + 1;
      const href = "/" + pathnameList.slice(0, atLength).join("/");

      return (
        <BreadcrumbsItem
          className={clsx(UPPERCASE_PATH.includes(label) && defaultClasses.uppercaseText)}
          key={index}
          href={href}
          component={atLength === pathnameList.length ? "p" : AppLink}
          underline="none"
          color="unset"
        >
          {atLength !== pathnameList.length
            ? label
            : handleFormatLabelBreadcrumbs(router.pathname, label, getLabel)}
        </BreadcrumbsItem>
      );
    });
  }, [router.pathname, getLabel]);

  return (
    <Breadcrumbs
      separator={<ArrowIcon />}
      classes={{
        root: clsx(defaultClasses.root, classes?.root),
        li: clsx(defaultClasses.li, classes?.li),
      }}
      {...otherProps}
    >
      {itemList}
    </Breadcrumbs>
  );
};

const UPPERCASE_PATH = ["ino", "fcfs"];

type AppBreadcrumbsProps = BreadcrumbsProps;

export default memo(AppBreadcrumbs);

const BreadcrumbsItem = ({ children, ...otherProps }: BreadcrumbsItemProps) => {
  return <AppTypography {...otherProps}>{children}</AppTypography>;
};

type BreadcrumbsItemProps = AppLinkProps & AppTypographyProps;

const handleFormatLabelBreadcrumbs = (
  path: string,
  defaultLabel: string,
  getLabel: (key: string) => string,
) => {
  switch (path) {
    case PathConstant.MARKETPLACE_EMOTE_DETAIL:
    case PathConstant.INVENTORY_WALLET_EMOTE_DETAIL:
    case PathConstant.INVENTORY_SELLING_EMOTE_DETAIL:
    case PathConstant.INVENTORY_IN_GAME_EMOTE_DETAIL:
      return getLabel("lEmoteDetail");
    case PathConstant.MARKETPLACE_CARD_DETAIL:
    case PathConstant.INVENTORY_WALLET_CARD_DETAIL:
    case PathConstant.INVENTORY_SELLING_CARD_DETAIL:
    case PathConstant.INVENTORY_IN_GAME_CARD_DETAIL:
      return getLabel("lCardDetail");
    case PathConstant.MARKETPLACE_BOX_DETAIL:
    case PathConstant.INVENTORY_WALLET_BOX_DETAIL:
    case PathConstant.INVENTORY_SELLING_BOX_DETAIL:
    case PathConstant.INVENTORY_IN_GAME_BOX_DETAIL:
      return getLabel("lBoxDetail");
    case PathConstant.MARKETPLACE_TOWER_SKIN_DETAIL:
    case PathConstant.INVENTORY_WALLET_TOWER_SKIN_DETAIL:
    case PathConstant.INVENTORY_SELLING_TOWER_SKIN_DETAIL:
    case PathConstant.INVENTORY_IN_GAME_TOWER_SKIN_DETAIL:
      return getLabel("lTowerSkinDetail");
    default:
      return defaultLabel;
  }
};

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    color: theme.palette.dark.dark5,
    textTransform: "capitalize",
  },
  li: {
    "&:last-child": {
      color: theme.palette.light.light2,
    },
  },
  uppercaseText: {
    textTransform: "uppercase",
  },
}));
