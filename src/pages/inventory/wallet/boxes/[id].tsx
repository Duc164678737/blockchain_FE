import React from "react";
import { NextPageWithLayout } from "pages/_app";
import { BoxDetailInventoryCard } from "components/sn-inventory";
import InventoryWalletSemiNftDetail from "components/sn-inventory-wallet/InventoryWalletSemiNftDetail";
import { useTranslation } from "react-i18next";
import { LangConstant, NFTConstant } from "const";
import { CommonUtils } from "utils";
import { GetServerSidePropsContext } from "next";

const BoxDetail: NextPageWithLayout = () => {
  const { t: getLabel } = useTranslation(LangConstant.NS_INVENTORY);
  return (
    <InventoryWalletSemiNftDetail
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
