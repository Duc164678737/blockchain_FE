import React, { Fragment } from "react";
import { CommonUtils } from "utils";
import { NextPageWithLayout } from "pages/_app";
import { GetServerSidePropsContext } from "next";
import { NFTConstant, PathConstant } from "const";
import { TowerSkinCard } from "components/common";
import { InventorySellingList } from "components/sn-inventory-selling";
import InventoryNftListLayout, {
  INVENTORY_SELLING_PATH_LIST,
} from "layouts/InventoryNftListLayout";

const TowerSkin: NextPageWithLayout = () => {
  return (
    <InventorySellingList
      typeItemClass={NFTConstant.NFT_CLASS_TYPE.towerSkin}
      pathname={PathConstant.INVENTORY_SELLING_TOWER_SKIN_DETAIL}
      NftComponent={TowerSkinCard}
    />
  );
};

export default TowerSkin;

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  CommonUtils.handleRedirectUnauthorized(context);

TowerSkin.getLayout = function getLayout(page) {
  return (
    <InventoryNftListLayout
      layoutProps={{ pageFilter: <Fragment />, pathData: INVENTORY_SELLING_PATH_LIST }}
    >
      {page}
    </InventoryNftListLayout>
  );
};
