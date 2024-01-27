import React, { ComponentPropsWithoutRef } from "react";
import { CommonUtils } from "utils";
import { PathConstant } from "const";
import { useRouter } from "next/router";
import { usePagination } from "layouts/helper";
import { InventoryActions, InventorySelector } from "redux-store";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import CommonNftListLayout, { CommonNftListLayoutProps } from "layouts/CommonNftListLayout";

const InventoryNftListLayout = ({ children, layoutProps }: InventoryNftListLayoutProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { totalLabel, pagination } = usePagination();
  const inventoryQuery = useSelector(InventorySelector.getQueryInventory, shallowEqual);

  const handleChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
    const newQuery = {
      ...inventoryQuery,
      pageNum: page,
    };

    const urlQuery = CommonUtils.convertUrlQueryFromReduxQuery(newQuery);
    CommonUtils.updateQueryRouter(router, router.pathname, urlQuery);

    dispatch(
      InventoryActions.setQueryParams({
        queryInventory: newQuery,
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
      {...layoutProps}
    >
      {children}
    </CommonNftListLayout>
  );
};

export default InventoryNftListLayout;

interface InventoryNftListLayoutProps extends ComponentPropsWithoutRef<"div"> {
  layoutProps: Pick<CommonNftListLayoutProps, "pageFilter" | "pathData">;
}

export const INVENTORY_WALLET_PATH_LIST = [
  PathConstant.INVENTORY_WALLET_CARD,
  PathConstant.INVENTORY_WALLET_BOX,
  PathConstant.INVENTORY_WALLET_EMOTE,
  PathConstant.INVENTORY_WALLET_TOWER_SKIN,
];

export const INVENTORY_SELLING_PATH_LIST = [
  PathConstant.INVENTORY_SELLING_CARD,
  PathConstant.INVENTORY_SELLING_BOX,
  PathConstant.INVENTORY_SELLING_EMOTE,
  PathConstant.INVENTORY_SELLING_TOWER_SKIN,
];

export const INVENTORY_IN_GAME_PATH_LIST = [
  PathConstant.INVENTORY_IN_GAME_CARD,
  PathConstant.INVENTORY_IN_GAME_BOX,
  PathConstant.INVENTORY_IN_GAME_EMOTE,
  PathConstant.INVENTORY_IN_GAME_TOWER_SKIN,
];
