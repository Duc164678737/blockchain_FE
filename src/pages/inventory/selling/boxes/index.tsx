import React, { Fragment } from "react";
import { CommonUtils } from "utils";
import { BoxCard } from "components/common";
import { NextPageWithLayout } from "pages/_app";
import { GetServerSidePropsContext } from "next";
import { NFTConstant, PathConstant } from "const";
import { InventorySellingList } from "components/sn-inventory-selling";
import InventoryNftListLayout, {
  INVENTORY_SELLING_PATH_LIST,
} from "layouts/InventoryNftListLayout";

const Box: NextPageWithLayout = () => {
  return (
    <InventorySellingList
      typeItemClass={NFTConstant.NFT_CLASS_TYPE.box}
      pathname={PathConstant.INVENTORY_SELLING_BOX_DETAIL}
      NftComponent={BoxCard}
    />
  );
};

export default Box;

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  CommonUtils.handleRedirectUnauthorized(context);

Box.getLayout = function getLayout(page) {
  return (
    <InventoryNftListLayout
      layoutProps={{ pageFilter: <Fragment />, pathData: INVENTORY_SELLING_PATH_LIST }}
    >
      {page}
    </InventoryNftListLayout>
  );
};
