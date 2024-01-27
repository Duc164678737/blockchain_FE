import React from "react";
import { NextPageWithLayout } from "pages/_app";
import { BoxDetailInventoryCard } from "components/sn-inventory";
import { InventorySellingSemiNftDetail } from "components/sn-inventory-selling";
import { LangConstant, NFTConstant } from "const";
import { useTranslation } from "react-i18next";
import { CommonUtils } from "utils";
import { GetServerSidePropsContext } from "next";

const BoxDetail: NextPageWithLayout = () => {
  const { t: getLabel } = useTranslation(LangConstant.NS_INVENTORY);

  return (
    <InventorySellingSemiNftDetail
      DetailInventorySemiNft={BoxDetailInventoryCard}
      typeSemiNftLabelUnstake={getLabel("fmIngame", { context: "box" })}
      typeSemiNftLabelSellAndStake={getLabel("fmAvailable", { context: "box" })}
      typeItemClass={NFTConstant.NFT_CLASS_TYPE.box}
    />
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  CommonUtils.handleRedirectUnauthorized(context);

export default BoxDetail;
