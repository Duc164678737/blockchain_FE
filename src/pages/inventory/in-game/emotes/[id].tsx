import React from "react";
import { NextPageWithLayout } from "pages/_app";
import { CommonUtils } from "utils";
import { GetServerSidePropsContext } from "next";
import { LangConstant, NFTConstant } from "const";
import { useTranslation } from "react-i18next";
import { InventoryInGameSemiNftDetail } from "components/sn-inventory-in-game";
import { EmoteAndTowerDetailInventoryCard } from "components/sn-inventory";

const EmoteDetail: NextPageWithLayout = () => {
  const { t: getLabel } = useTranslation(LangConstant.NS_INVENTORY);

  return (
    <InventoryInGameSemiNftDetail
      typeItemClass={NFTConstant.NFT_CLASS_TYPE.emote}
      DetailInventorySemiNft={EmoteAndTowerDetailInventoryCard}
      typeSemiNftLabelUnstake={getLabel("fmIngame", { context: "emote" })}
      typeSemiNftLabelSellAndStake={getLabel("fmAvailable", { context: "emote" })}
    />
  );
};

export default EmoteDetail;

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  CommonUtils.handleRedirectUnauthorizedGameAccount(context);
