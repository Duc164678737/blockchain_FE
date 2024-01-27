import React from "react";
import { CommonUtils } from "utils";
import { HeroCard } from "components/common";
import { NextPageWithLayout } from "pages/_app";
import { GetServerSidePropsContext } from "next";
import { NFTConstant, PathConstant } from "const";
import { InventoryWalletList } from "components/sn-inventory-wallet";
import InventoryNftListLayout, { INVENTORY_WALLET_PATH_LIST } from "layouts/InventoryNftListLayout";

const Cards: NextPageWithLayout = () => {
  return (
    <InventoryWalletList
      typeItemClass={NFTConstant.NFT_CLASS_TYPE.card}
      pathname={PathConstant.INVENTORY_WALLET_CARD_DETAIL}
      NftComponent={HeroCard}
    />
  );
};

export default Cards;

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  CommonUtils.handleRedirectUnauthorized(context);

Cards.getLayout = function getLayout(page) {
  return (
    <InventoryNftListLayout
      layoutProps={{ pageFilter: "Filter", pathData: INVENTORY_WALLET_PATH_LIST }}
    >
      {page}
    </InventoryNftListLayout>
  );
};
