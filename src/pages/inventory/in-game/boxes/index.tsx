import React, { Fragment } from "react";
import { CommonUtils } from "utils";
import { BoxCard } from "components/common";
import { NextPageWithLayout } from "pages/_app";
import { GetServerSidePropsContext } from "next";
import { NFTConstant, PathConstant } from "const";
import { InventoryInGameList } from "components/sn-inventory-in-game";
import InventoryNftListLayout, {
  INVENTORY_IN_GAME_PATH_LIST,
} from "layouts/InventoryNftListLayout";

const Boxes: NextPageWithLayout = () => {
  return (
    <InventoryInGameList
      typeItemClass={NFTConstant.NFT_CLASS_TYPE.box}
      pathname={PathConstant.INVENTORY_IN_GAME_BOX_DETAIL}
      NftComponent={BoxCard}
    />
  );
};

export default Boxes;

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  CommonUtils.handleRedirectUnauthorizedGameAccount(context);

Boxes.getLayout = function getLayout(page) {
  return (
    <InventoryNftListLayout
      layoutProps={{ pageFilter: <Fragment />, pathData: INVENTORY_IN_GAME_PATH_LIST }}
    >
      {page}
    </InventoryNftListLayout>
  );
};
