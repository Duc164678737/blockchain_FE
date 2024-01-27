import React, { Fragment } from "react";
import { CommonUtils } from "utils";
import { NextPageWithLayout } from "pages/_app";
import { GetServerSidePropsContext } from "next";
import { NFTConstant, PathConstant } from "const";
import { TowerSkinCard } from "components/common";
import { InventoryWalletList } from "components/sn-inventory-wallet";
import InventoryNftListLayout, { INVENTORY_WALLET_PATH_LIST } from "layouts/InventoryNftListLayout";

const TowerSkin: NextPageWithLayout = () => {
  return (
    <InventoryWalletList
      typeItemClass={NFTConstant.NFT_CLASS_TYPE.towerSkin}
      pathname={PathConstant.INVENTORY_WALLET_TOWER_SKIN_DETAIL}
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
      layoutProps={{ pageFilter: <Fragment />, pathData: INVENTORY_WALLET_PATH_LIST }}
    >
      {page}
    </InventoryNftListLayout>
  );
};
