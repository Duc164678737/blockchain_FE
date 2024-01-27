import React from "react";
import { NextPageWithLayout } from "pages/_app";
import { CommonUtils } from "utils";
import { GetServerSidePropsContext } from "next";
import { InventoryInGameSemiNftDetail } from "components/sn-inventory-in-game";
import { BoxDetailInventoryCard } from "components/sn-inventory";
import { LangConstant, NFTConstant } from "const";
import { useTranslation } from "react-i18next";

const BoxDetail: NextPageWithLayout = () => {
  const { t: getLabel } = useTranslation(LangConstant.NS_INVENTORY);

  return (
    <InventoryInGameSemiNftDetail
      typeItemClass={NFTConstant.NFT_CLASS_TYPE.box}
      DetailInventorySemiNft={BoxDetailInventoryCard}
      typeSemiNftLabelUnstake={getLabel("fmIngame", { context: "box" })}
      typeSemiNftLabelSellAndStake={getLabel("fmAvailable", { context: "box" })}
    />
  );
};

export default BoxDetail;

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  CommonUtils.handleRedirectUnauthorizedGameAccount(context);
