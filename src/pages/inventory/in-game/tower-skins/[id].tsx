import React from "react";
import { NextPageWithLayout } from "pages/_app";
import { CommonUtils } from "utils";
import { GetServerSidePropsContext } from "next";
import { LangConstant, NFTConstant } from "const";
import { useTranslation } from "react-i18next";
import { InventoryInGameSemiNftDetail } from "components/sn-inventory-in-game";
import { EmoteAndTowerDetailInventoryCard } from "components/sn-inventory";

const TowerSkinDetail: NextPageWithLayout = () => {
  const { t: getLabel } = useTranslation(LangConstant.NS_INVENTORY);

  return (
    <InventoryInGameSemiNftDetail
      typeItemClass={NFTConstant.NFT_CLASS_TYPE.towerSkin}
      DetailInventorySemiNft={EmoteAndTowerDetailInventoryCard}
      typeSemiNftLabelUnstake={getLabel("fmIngame", { context: "tower skin" })}
      typeSemiNftLabelSellAndStake={getLabel("fmAvailable", { context: "tower skin" })}
    />
  );
};

export default TowerSkinDetail;

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  CommonUtils.handleRedirectUnauthorizedGameAccount(context);
