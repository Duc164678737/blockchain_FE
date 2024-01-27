import React from "react";
import { CommonUtils } from "utils";
import { HeroCard } from "components/common";
import { NextPageWithLayout } from "pages/_app";
import { GetServerSidePropsContext } from "next";
import { NFTConstant, PathConstant } from "const";
import { InventoryInGameList } from "components/sn-inventory-in-game";
import InventoryNftListLayout, {
  INVENTORY_IN_GAME_PATH_LIST,
} from "layouts/InventoryNftListLayout";

const Cards: NextPageWithLayout = () => {
  return (
    <InventoryInGameList
      typeItemClass={NFTConstant.NFT_CLASS_TYPE.card}
      pathname={PathConstant.INVENTORY_IN_GAME_CARD_DETAIL}
      NftComponent={HeroCard}
    />
  );
};

export default Cards;

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  CommonUtils.handleRedirectUnauthorizedGameAccount(context);

Cards.getLayout = function getLayout(page) {
  return (
    <InventoryNftListLayout
      layoutProps={{ pageFilter: "Filter", pathData: INVENTORY_IN_GAME_PATH_LIST }}
    >
      {page}
    </InventoryNftListLayout>
  );
};
