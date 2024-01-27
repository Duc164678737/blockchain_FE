import React, { Fragment } from "react";
import { CommonUtils } from "utils";
import { NextPageWithLayout } from "pages/_app";
import { GetServerSidePropsContext } from "next";
import { NFTConstant, PathConstant } from "const";
import { TowerSkinCard } from "components/common";
import { InventoryInGameList } from "components/sn-inventory-in-game";
import InventoryNftListLayout, {
  INVENTORY_IN_GAME_PATH_LIST,
} from "layouts/InventoryNftListLayout";

const TowerSkins: NextPageWithLayout = () => {
  return (
    <InventoryInGameList
      typeItemClass={NFTConstant.NFT_CLASS_TYPE.towerSkin}
      pathname={PathConstant.INVENTORY_IN_GAME_TOWER_SKIN_DETAIL}
      NftComponent={TowerSkinCard}
    />
  );
};

export default TowerSkins;

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  CommonUtils.handleRedirectUnauthorizedGameAccount(context);

TowerSkins.getLayout = function getLayout(page) {
  return (
    <InventoryNftListLayout
      layoutProps={{ pageFilter: <Fragment />, pathData: INVENTORY_IN_GAME_PATH_LIST }}
    >
      {page}
    </InventoryNftListLayout>
  );
};
