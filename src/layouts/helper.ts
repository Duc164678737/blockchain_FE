import { useMemo } from "react";
import { useRouter } from "next/router";
import { AppConstant, PathConstant } from "const";
import { getLabel } from "language";
import { FormatUtils } from "utils";
import { shallowEqual, useSelector } from "react-redux";
import { InventorySelector, MarketplaceSelector } from "redux-store";
import Pagination from "models/classes/Pagination";

export const usePagination = (): PaginationWithLabel => {
  const { pathname: pathName } = useRouter();
  const { pagination: marketPagination } = useSelector(
    MarketplaceSelector.getNftList,
    shallowEqual,
  );

  const { pagination: inventoryPagination } = useSelector(
    InventorySelector.getNftList,
    shallowEqual,
  );

  const { pagination: inGameInventoryPagination } = useSelector(
    InventorySelector.getNftInGameList,
    shallowEqual,
  );

  const pagination = useMemo(() => {
    let data;
    if (
      pathName.includes(PathConstant.MARKETPLACE) ||
      pathName.includes(PathConstant.INVENTORY_SELLING)
    ) {
      // Using market redux when the current page belong to inventory selling
      data = marketPagination;
    } else if (pathName.includes(PathConstant.INVENTORY_WALLET)) {
      data = inventoryPagination;
    } else {
      data = inGameInventoryPagination;
    }

    return new Pagination(data);
  }, [marketPagination, inventoryPagination, inGameInventoryPagination]);

  const totalLabel = useMemo(() => {
    const formatData = {
      total: FormatUtils.formatNumber(pagination.totalItems) || AppConstant.NOT_AVAILABLE_VALUE,
      count: pagination.totalItems,
    };
    switch (pathName) {
      case PathConstant.MARKETPLACE_CARD:
      case PathConstant.INVENTORY_SELLING_CARD:
      case PathConstant.INVENTORY_WALLET_CARD:
      case PathConstant.INVENTORY_IN_GAME_CARD:
        return getLabel("fmHero", formatData);

      case PathConstant.MARKETPLACE_BOX:
      case PathConstant.INVENTORY_SELLING_BOX:
      case PathConstant.INVENTORY_WALLET_BOX:
      case PathConstant.INVENTORY_IN_GAME_BOX:
        return getLabel("fmBox", formatData);

      case PathConstant.MARKETPLACE_EMOTE:
      case PathConstant.INVENTORY_SELLING_EMOTE:
      case PathConstant.INVENTORY_WALLET_EMOTE:
      case PathConstant.INVENTORY_IN_GAME_EMOTE:
        return getLabel("fmEmote", formatData);

      case PathConstant.MARKETPLACE_TOWER_SKIN:
      case PathConstant.INVENTORY_SELLING_TOWER_SKIN:
      case PathConstant.INVENTORY_WALLET_TOWER_SKIN:
      case PathConstant.INVENTORY_IN_GAME_TOWER_SKIN:
        return getLabel("fmTowerSkin", formatData);

      default:
        return "";
    }
  }, [pathName, getLabel, pagination]);

  return { totalLabel, pagination };
};

export type PaginationWithLabel = {
  totalLabel: string;
  pagination: Pagination;
};
