import React from "react";
import { NextPageWithLayout } from "pages/_app";
import { EmoteCardList } from "components/sn-marketplace";
import MarketplaceNftListLayout from "layouts/MarketplaceNftListLayout";

const Emote: NextPageWithLayout = () => {
  return <EmoteCardList />;
};

export default Emote;

Emote.getLayout = function getLayout(page) {
  return (
    <MarketplaceNftListLayout layoutProps={{ pageFilter: "" }}>{page}</MarketplaceNftListLayout>
  );
};
