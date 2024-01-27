import React, { Fragment } from "react";
import { CommonUtils } from "utils";
import { EmoteCard } from "components/common";
import { NextPageWithLayout } from "pages/_app";
import { GetServerSidePropsContext } from "next";
import { NFTConstant, PathConstant } from "const";
import { InventoryWalletList } from "components/sn-inventory-wallet";
import InventoryNftListLayout, { INVENTORY_WALLET_PATH_LIST } from "layouts/InventoryNftListLayout";

const Emotes: NextPageWithLayout = () => {
  return (
    <InventoryWalletList
      typeItemClass={NFTConstant.NFT_CLASS_TYPE.emote}
      pathname={PathConstant.INVENTORY_WALLET_EMOTE_DETAIL}
      NftComponent={EmoteCard}
    />
  );
};

export default Emotes;

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  CommonUtils.handleRedirectUnauthorized(context);

Emotes.getLayout = function getLayout(page) {
  return (
    <InventoryNftListLayout
      layoutProps={{ pageFilter: <Fragment />, pathData: INVENTORY_WALLET_PATH_LIST }}
    >
      {page}
    </InventoryNftListLayout>
  );
};
