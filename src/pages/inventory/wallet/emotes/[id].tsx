import React from "react";
import { NextPageWithLayout } from "pages/_app";
import { EmoteAndTowerDetailInventoryCard } from "components/sn-inventory";
import InventoryWalletSemiNftDetail from "components/sn-inventory-wallet/InventoryWalletSemiNftDetail";
import { useTranslation } from "react-i18next";
import { LangConstant, NFTConstant } from "const";
import { CommonUtils } from "utils";
import { GetServerSidePropsContext } from "next";

const emoteDetail: NextPageWithLayout = () => {
  const { t: getLabel } = useTranslation(LangConstant.NS_INVENTORY);
  return (
    <InventoryWalletSemiNftDetail
      DetailInventorySemiNft={EmoteAndTowerDetailInventoryCard}
      typeSemiNftLabelUnstake={getLabel("fmIngame", { context: "emote" })}
      typeSemiNftLabelSellAndStake={getLabel("fmAvailable", { context: "emote" })}
      typeItemClass={NFTConstant.NFT_CLASS_TYPE.emote}
    />
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  CommonUtils.handleRedirectUnauthorized(context);

export default emoteDetail;
