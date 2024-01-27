import React, { memo, useCallback, useEffect, useState } from "react";
import { CommonUtils } from "utils";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import { useTranslation } from "react-i18next";
import { cleanObject } from "utils/query.utils";
import { AppConstant, NFTConstant } from "const";
import { Box, Button, Stack } from "@mui/material";
import { ThemeProps, KeyAbleProps } from "models/types";
import { IDataModal } from "../filter/TypeFilterCheckBox";
import { LevelFilter, RarityFilter, TypesFilter } from "../filter";
import { QueryMarketplaceProps } from "redux-store/marketplace.redux";
import { AppButton, AppTypography, PriceFilter } from "components/common";

const PanelFilter = ({ queryParams, onConfirmFilter }: PanelFilterProps) => {
  const router = useRouter();
  const classes = useStyles();

  const { t: getLabel } = useTranslation();

  const [query, setQuery] = useState<QueryProps>(QUERY_DEFAULT);

  const handleUpdateQuery = useCallback(
    (query: KeyAbleProps) => {
      const urlQuery = CommonUtils.convertUrlQueryFromReduxQuery(query);
      CommonUtils.updateQueryRouter(router, router.pathname, urlQuery);
    },
    [router],
  );

  const handleChangeTrackFilter = (key: TRACK_KEY) => (arr: IDataModal[]) => {
    const filter = arr
      .filter((item: IDataModal) => item.isChecked)
      .map((item: IDataModal) => item.value);

    let newQuery;
    if (TRACK_KEY.rarityNft === key) {
      newQuery = {
        ...query,
        rareTypes: filter,
      };
    } else {
      newQuery = {
        ...query,
        itemTypes: filter,
      };
    }

    setQuery(newQuery as QueryProps);
  };

  const handlePriceFilter = (min: string, max: string) => {
    setQuery({ ...query, startPrice: min, toPrice: max });
  };

  const handleChangeLevel = (newLevel: number) => {
    setQuery({ ...query, level: newLevel });
  };

  const handleConfirmFilter = (newQuery: QueryProps) => {
    if (newQuery.level === 0) {
      delete newQuery.level;
    }

    const newQueryFormat = cleanObject({
      ...newQuery,
      pageNum: AppConstant.DEFAULT_PAGINATION.page,
    });

    handleUpdateQuery(newQueryFormat);

    onConfirmFilter(newQueryFormat as QueryProps);
  };

  useEffect(() => {
    setQuery({
      ...queryParams,
      itemTypes: queryParams.itemTypes || [],
      rareTypes: queryParams.rareTypes || [],
      startPrice: queryParams.startPrice?.toString() || "",
      toPrice: queryParams.toPrice?.toString() || "",
    });
  }, [queryParams]);

  return (
    <Stack>
      <Box className="space-between-root" mb={3}>
        <AppTypography>{getLabel("lFilter")}</AppTypography>
        <Button
          onClick={() =>
            setQuery({
              ...QUERY_DEFAULT,
              sorts: queryParams?.sorts,
            })
          }
          className={classes.clear}
        >
          {getLabel("lClearFilters")}
        </Button>
      </Box>
      <TypesFilter
        className={classes.trackFilter}
        onChangeValue={handleChangeTrackFilter(TRACK_KEY.typeNft)}
        data={query.itemTypes}
      />
      <RarityFilter
        className={classes.trackFilter}
        onChangeValue={handleChangeTrackFilter(TRACK_KEY.rarityNft)}
        data={query.rareTypes}
      />
      <PriceFilter
        min={query.startPrice}
        max={query.toPrice}
        className={classes.trackFilter}
        onChangePrice={handlePriceFilter}
      />
      <LevelFilter
        className={classes.trackFilter}
        level={query.level}
        onChangeLevel={handleChangeLevel}
      />
      <AppButton
        onClick={() => handleConfirmFilter(query)}
        variant="contained"
        className={classes.confirmButton}
        wrapperProps={{ className: classes.confirmButtonWrapper }}
      >
        {getLabel("lConfirm")}
      </AppButton>
    </Stack>
  );
};

export default memo(PanelFilter);

interface PanelFilterProps {
  queryParams: QueryMarketplaceProps;
  onConfirmFilter: (newQueryFormat: QueryProps) => void;
}

const useStyles = makeStyles((theme: ThemeProps) => ({
  clear: {
    ...theme.typography?.body1,
    textTransform: "unset",
    padding: 0,
    color: theme.palette.primary.light5,
  },
  trackFilter: {
    borderTop: `1px solid ${theme.palette.grey[50]}`,
    padding: theme.spacing(1.5, 0),
  },
  confirmButtonWrapper: {
    width: "100%",
    marginTop: theme.spacing(2.5),
  },
  confirmButton: {
    width: "100%",
  },
}));

export interface QueryProps {
  pageNum: number;
  pageSize: number;
  itemTypes: NFTConstant.NFT_TYPE[];
  rareTypes: NFTConstant.RARITY_TYPE[];
  startPrice?: string;
  toPrice?: string;
  level?: number;
  sorts?: KeyAbleProps;
}

const QUERY_DEFAULT = {
  pageNum: AppConstant.DEFAULT_PAGINATION.page,
  pageSize: AppConstant.SIZE_PAGINATION_DEFAULT,
  itemTypes: [] as NFTConstant.NFT_TYPE[],
  rareTypes: [] as NFTConstant.RARITY_TYPE[],
  startPrice: "",
  toPrice: "",
  level: 0,
};

enum TRACK_KEY {
  typeNft,
  rarityNft,
}
