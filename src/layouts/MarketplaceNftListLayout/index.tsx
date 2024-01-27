import React, { ComponentPropsWithoutRef } from "react";
import { CommonUtils } from "utils";
import { PathConstant } from "const";
import { useRouter } from "next/router";
import { usePagination } from "layouts/helper";
import { MarketplaceActions, MarketplaceSelector } from "redux-store";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import CommonNftListLayout, { CommonNftListLayoutProps } from "layouts/CommonNftListLayout";

const MarketplaceNftListLayout = ({ children, layoutProps }: MarketplaceNftListLayoutProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { totalLabel, pagination } = usePagination();

  const marketplaceQuery = useSelector(MarketplaceSelector.getQueryMarketplace, shallowEqual);

  const handleChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
    const newQuery = {
      ...marketplaceQuery,
      pageNum: page,
    };

    const urlQuery = CommonUtils.convertUrlQueryFromReduxQuery(newQuery);
    CommonUtils.updateQueryRouter(router, router.pathname, urlQuery);

    dispatch(
      MarketplaceActions.setQueryParams({
        queryMarketplace: newQuery,
      }),
    );
  };

  return (
    <CommonNftListLayout
      label={totalLabel}
      pagePaginationProps={{
        onChange: handleChangePage,
        page: pagination.pageNum,
        count: pagination.totalPages,
      }}
      pathData={MARKETPLACE_NFT_LIST_PATH}
      {...layoutProps}
    >
      {children}
    </CommonNftListLayout>
  );
};

export default MarketplaceNftListLayout;

interface MarketplaceNftListLayoutProps extends ComponentPropsWithoutRef<"div"> {
  layoutProps: Pick<CommonNftListLayoutProps, "pageFilter">;
}

const MARKETPLACE_NFT_LIST_PATH = [
  PathConstant.MARKETPLACE_CARD,
  PathConstant.MARKETPLACE_BOX,
  PathConstant.MARKETPLACE_EMOTE,
  PathConstant.MARKETPLACE_TOWER_SKIN,
];
