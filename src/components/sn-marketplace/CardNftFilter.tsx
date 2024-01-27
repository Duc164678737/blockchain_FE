import React from "react";
import { CardNftFilterButton } from "components/common";
import { MarketplaceActions, MarketplaceSelector } from "redux-store";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { QueryMarketplaceProps } from "redux-store/marketplace.redux";
import { QueryProps } from "components/common/CardNftFilterButton/PanelFilter";

const CardNftFilter = () => {
  const dispatch = useDispatch();

  const marketplaceQuery = useSelector(MarketplaceSelector.getQueryMarketplace, shallowEqual);

  const handleFilterCard = (queryData: QueryProps) => {
    dispatch(
      MarketplaceActions.setQueryParams({
        queryMarketplace: queryData as QueryMarketplaceProps,
      }),
    );
  };

  return <CardNftFilterButton queryParams={marketplaceQuery} onConfirmFilter={handleFilterCard} />;
};

export default CardNftFilter;
