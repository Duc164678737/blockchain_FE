import React, { memo, useMemo } from "react";
import { Button, ButtonProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AppTypography } from "components/common";
import { SoftIcon } from "components/icons";
import { ThemeProps } from "models/types";
import { palette } from "public/material";
import { useTranslation } from "react-i18next";
import { AppConstant, NFTConstant } from "const";
import { useDispatch, useSelector } from "react-redux";
import { MarketplaceActions, MarketplaceSelector } from "redux-store";
import { useRouter } from "next/router";
import { CommonUtils } from "utils";

const PriceSortButton = (props: PriceSortButtonProps) => {
  const defaultClasses = useStyles({});
  const { t: getLabel } = useTranslation();
  const router = useRouter();

  const dispatch = useDispatch();
  const queryMarketplace = useSelector(MarketplaceSelector.getQueryMarketplace);

  const currentStep = useMemo(() => {
    if (queryMarketplace.sorts?.[NFTConstant.NFT_SORT_KEY.price]) {
      if (
        queryMarketplace.sorts[NFTConstant.NFT_SORT_KEY.price] === AppConstant.SORT_DIRECTION.asc
      ) {
        return PRICE_SOFT_STEP.asc;
      } else {
        return PRICE_SOFT_STEP.desc;
      }
    } else {
      return PRICE_SOFT_STEP.none;
    }
  }, [queryMarketplace.sorts]);

  const labelButton = useMemo(
    () =>
      currentStep === PRICE_SOFT_STEP.desc ? getLabel("lHightestPrice") : getLabel("lLowestPrice"),
    [getLabel, currentStep],
  );

  const handlePriceSoft = () => {
    let newSortPrice = {};

    if (currentStep !== PRICE_SOFT_STEP.desc) {
      const newStep = currentStep + 1;
      newSortPrice = {
        [NFTConstant.NFT_SORT_KEY.price]:
          newStep === PRICE_SOFT_STEP.asc
            ? AppConstant.SORT_DIRECTION.asc
            : AppConstant.SORT_DIRECTION.desc,
      };
    }

    const newQuery = {
      ...queryMarketplace,
      sorts: newSortPrice,
    };

    dispatch(
      MarketplaceActions.setQueryParams({
        queryMarketplace: newQuery,
      }),
    );

    const urlQuery = CommonUtils.convertUrlQueryFromReduxQuery(newQuery);
    CommonUtils.updateQueryRouter(router, router.pathname, urlQuery);
  };

  return (
    <Button
      onClick={handlePriceSoft}
      classes={{ root: defaultClasses.root, startIcon: defaultClasses.startIcon }}
      startIcon={
        <SoftIcon
          ascColor={
            currentStep === PRICE_SOFT_STEP.asc ? palette.primary.main : palette.light.light5
          }
          descColor={
            currentStep === PRICE_SOFT_STEP.desc ? palette.primary.main : palette.light.light5
          }
        />
      }
      {...props}
    >
      <AppTypography
        color={currentStep !== PRICE_SOFT_STEP.none ? palette.primary.main : "inherit"}
      >
        {labelButton}
      </AppTypography>
    </Button>
  );
};

enum PRICE_SOFT_STEP {
  none,
  asc,
  desc,
}

type PriceSortButtonProps = ButtonProps;

export default memo(PriceSortButton);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    ...theme.typography?.body1,
    textTransform: "unset",
    color: theme.palette.light.light3,
    padding: theme.spacing(0.5, 2, 0.5, 1.25),
    minWidth: 156,
    justifyContent: "flex-start",
    backgroundColor: theme.palette.grey[800],
    borderRadius: 24,
    "&:hover": {
      backgroundColor: theme.palette.grey[800],
    },
  },
  startIcon: {
    marginLeft: 0,
    "&>*:nth-of-type(1)": {
      fontSize: 16,
    },
  },
}));
