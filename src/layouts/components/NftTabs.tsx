import React from "react";
import {
  MarketplaceBoxIcon,
  MarketplaceCartIcon,
  MarketplaceEmoteIcon,
  MarketplaceTowerSkinIcon,
} from "components/icons";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import { HeaderTabs } from "layouts/HeaderTabsLayout";
import { ObjectMultiLanguageProps } from "models/types";

const NftTabs = ({ currentPagePathData }: NftTabsProps) => {
  const { t: getLabel } = useTranslation();

  const objMarketplaceContent: ObjectMultiLanguageProps = getLabel("objMarketplace", {
    returnObjects: true,
  });

  return <HeaderTabs headerTabs={getHeaderTabs(objMarketplaceContent, currentPagePathData)} />;
};

export default NftTabs;

interface NftTabsProps {
  currentPagePathData: string[];
}

const getHeaderTabs = (
  objMarketplaceContent: ObjectMultiLanguageProps,
  currentPagePathData: string[],
) => {
  const classes = useStyles();

  return [
    {
      icon: <MarketplaceCartIcon className={classes.bigIcons} />,
      path: currentPagePathData[0],
      label: objMarketplaceContent.lCard,
    },
    {
      icon: <MarketplaceBoxIcon className={classes.bigIcons} />,
      path: currentPagePathData[1],
      label: objMarketplaceContent.lBox,
    },
    {
      icon: <MarketplaceEmoteIcon className={classes.smallIcon} />,
      path: currentPagePathData[2],
      label: objMarketplaceContent.lEmote,
    },
    {
      icon: <MarketplaceTowerSkinIcon className={classes.bigIcons} />,
      path: currentPagePathData[3],
      label: objMarketplaceContent.lTowerSkin,
    },
  ];
};

export const useStyles = makeStyles(() => ({
  bigIcons: {
    width: 22,
    height: 22,
  },
  smallIcon: {
    width: 16,
    height: 16,
  },
}));
