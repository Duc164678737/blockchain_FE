import React from "react";
import { NextPageWithLayout } from "pages/_app";
import { TowerSkinCardList } from "components/sn-marketplace";
import MarketplaceNftListLayout from "layouts/MarketplaceNftListLayout";

const TowerSkin: NextPageWithLayout = () => {
  return <TowerSkinCardList />;
};

export default TowerSkin;

TowerSkin.getLayout = function getLayout(page) {
  return (
    <MarketplaceNftListLayout layoutProps={{ pageFilter: "" }}>{page}</MarketplaceNftListLayout>
  );
};
