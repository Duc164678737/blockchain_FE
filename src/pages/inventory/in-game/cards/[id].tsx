import React from "react";
import { NextPageWithLayout } from "pages/_app";
import { CommonUtils } from "utils";
import { GetServerSidePropsContext } from "next";
import InventoryInGameDetail from "components/sn-inventory-in-game/InventoryInGameDetail";
import { HeroCardDetail } from "components/sn-marketplace";
import { NFTConstant } from "const";

const CardDetail: NextPageWithLayout = () => {
  return (
    <InventoryInGameDetail
      nftType={NFTConstant.NFT_CLASS_TYPE.card}
      DetailInGameInventoryCard={HeroCardDetail}
    />
  );
};

export default CardDetail;

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  CommonUtils.handleRedirectUnauthorizedGameAccount(context);
