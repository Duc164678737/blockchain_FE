import React from "react";
import { NextPageWithLayout } from "pages/_app";
import { CardNftFilter, HeroCardList } from "components/sn-marketplace";
import { DateSortButton, PriceSortButton } from "layouts/MarketplaceNftListLayout/components";
import MarketplaceNftListLayout from "layouts/MarketplaceNftListLayout";

const Cards: NextPageWithLayout = () => {
  return <HeroCardList />;
};

export default Cards;

Cards.getLayout = function getLayout(page) {
  return (
    <MarketplaceNftListLayout
      layoutProps={{
        pageFilter: (
          <>
            <DateSortButton />
            <PriceSortButton />
            <CardNftFilter />
          </>
        ),
      }}
    >
      {page}
    </MarketplaceNftListLayout>
  );
};
