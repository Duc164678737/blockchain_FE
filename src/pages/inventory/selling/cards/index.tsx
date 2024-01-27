import React from "react";
import { CommonUtils } from "utils";
import { HeroCard } from "components/common";
import { NextPageWithLayout } from "pages/_app";
import { GetServerSidePropsContext } from "next";
import { NFTConstant, PathConstant } from "const";
import { InventorySellingList } from "components/sn-inventory-selling";
import InventoryNftListLayout, {
  INVENTORY_SELLING_PATH_LIST,
} from "layouts/InventoryNftListLayout";

const Cards: NextPageWithLayout = () => {
  return (
    <InventorySellingList
      typeItemClass={NFTConstant.NFT_CLASS_TYPE.card}
      pathname={PathConstant.INVENTORY_SELLING_CARD_DETAIL}
      NftComponent={HeroCard}
    />
  );
};

export default Cards;

Cards.getLayout = function getLayout(page) {
  return (
    <InventoryNftListLayout
      layoutProps={{ pageFilter: "Filter", pathData: INVENTORY_SELLING_PATH_LIST }}
    >
      {page}
    </InventoryNftListLayout>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  CommonUtils.handleRedirectUnauthorized(context);
