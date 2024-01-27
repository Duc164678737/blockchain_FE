import React from "react";
import { NextPageWithLayout } from "pages/_app";
import { EmoteAndTowerDetailInventoryCard } from "components/sn-inventory";
import { InventorySellingSemiNftDetail } from "components/sn-inventory-selling";
import { useTranslation } from "react-i18next";
import { LangConstant, NFTConstant } from "const";
import { CommonUtils } from "utils";
import { GetServerSidePropsContext } from "next";

const TowerSkinDetail: NextPageWithLayout = () => {
  const { t: getLabel } = useTranslation(LangConstant.NS_INVENTORY);

  return (
    <InventorySellingSemiNftDetail
      DetailInventorySemiNft={EmoteAndTowerDetailInventoryCard}
      typeItemClass={NFTConstant.NFT_CLASS_TYPE.emote}
      typeSemiNftLabelUnstake={getLabel("fmIngame", { context: "towerSkin" })}
      typeSemiNftLabelSellAndStake={getLabel("fmAvailable", { context: "towerSkin" })}
    />
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  CommonUtils.handleRedirectUnauthorized(context);

export default TowerSkinDetail;
