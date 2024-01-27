import React, { Fragment } from "react";
import { CommonUtils } from "utils";
import { EmoteCard } from "components/common";
import { NextPageWithLayout } from "pages/_app";
import { GetServerSidePropsContext } from "next";
import { NFTConstant, PathConstant } from "const";
import { InventoryInGameList } from "components/sn-inventory-in-game";
import InventoryNftListLayout, {
  INVENTORY_IN_GAME_PATH_LIST,
} from "layouts/InventoryNftListLayout";

const Emotes: NextPageWithLayout = () => {
  return (
    <InventoryInGameList
      typeItemClass={NFTConstant.NFT_CLASS_TYPE.emote}
      pathname={PathConstant.INVENTORY_IN_GAME_EMOTE_DETAIL}
      NftComponent={EmoteCard}
    />
  );
};

export default Emotes;

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  CommonUtils.handleRedirectUnauthorizedGameAccount(context);

Emotes.getLayout = function getLayout(page) {
  return (
    <InventoryNftListLayout
      layoutProps={{ pageFilter: <Fragment />, pathData: INVENTORY_IN_GAME_PATH_LIST }}
    >
      {page}
    </InventoryNftListLayout>
  );
};
