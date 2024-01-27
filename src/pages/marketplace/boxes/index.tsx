import React from "react";
import { NextPageWithLayout } from "pages/_app";
import { BoxCardList } from "components/sn-marketplace";
import MarketplaceNftListLayout from "layouts/MarketplaceNftListLayout";

const Boxes: NextPageWithLayout = () => {
  return <BoxCardList />;
};

export default Boxes;

Boxes.getLayout = function getLayout(page) {
  return (
    <MarketplaceNftListLayout layoutProps={{ pageFilter: "" }}>{page}</MarketplaceNftListLayout>
  );
};
