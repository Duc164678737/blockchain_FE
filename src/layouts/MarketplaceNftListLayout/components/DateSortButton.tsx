import React, { memo, useMemo } from "react";
import { Button, ButtonProps } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { SoftIcon } from "components/icons";
import { ThemeProps } from "models/types";
import { useTranslation } from "react-i18next";
import { palette } from "public/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { MarketplaceActions, MarketplaceSelector } from "redux-store";
import { AppConstant, NFTConstant } from "const";
import { AppTypography } from "components/common";
import { useRouter } from "next/router";
import { CommonUtils } from "utils";

const DateSortButton = (props: ButtonProps) => {
  const defaultClasses = useStyles();
  const { t: getLabel } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();

  const queryMarketplace = useSelector(MarketplaceSelector.getQueryMarketplace, shallowEqual);

  const currentStep = useMemo(() => {
    if (queryMarketplace.sorts?.[NFTConstant.NFT_SORT_KEY.date]) {
      if (
        queryMarketplace.sorts[NFTConstant.NFT_SORT_KEY.date] === AppConstant.SORT_DIRECTION.asc
      ) {
        return DATE_SOFT_STEP.asc;
      } else {
        return DATE_SOFT_STEP.desc;
      }
    } else {
      return DATE_SOFT_STEP.none;
    }
  }, [queryMarketplace.sorts]);

  const handleSoftDateNft = () => {
    let direction = AppConstant.SORT_DIRECTION.desc;
    if (currentStep === DATE_SOFT_STEP.desc) {
      direction = AppConstant.SORT_DIRECTION.asc;
    }

    const newQuery = {
      ...queryMarketplace,
      sorts: {
        [NFTConstant.NFT_SORT_KEY.date]: direction,
      },
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
      onClick={handleSoftDateNft}
      classes={{ root: defaultClasses.root, startIcon: defaultClasses.startIcon }}
      startIcon={
        <SoftIcon
          ascColor={
            currentStep === DATE_SOFT_STEP.desc ? palette.primary.main : palette.light.light5
          }
          descColor={
            currentStep === DATE_SOFT_STEP.asc ? palette.primary.main : palette.light.light5
          }
        />
      }
      {...props}
    >
      <AppTypography color={currentStep === DATE_SOFT_STEP.none ? "inherit" : "primary.main"}>
        {currentStep === DATE_SOFT_STEP.asc ? getLabel("lOldest") : getLabel("lNewest")}
      </AppTypography>
    </Button>
  );
};

enum DATE_SOFT_STEP {
  none,
  asc,
  desc,
}

export default memo(DateSortButton);

const useStyles = makeStyles((theme: ThemeProps) => ({
  root: {
    ...theme.typography?.body1,
    textTransform: "unset",
    color: theme.palette.light.light3,
    padding: theme.spacing(0.5, 2, 0.5, 1.25),
    backgroundColor: theme.palette.grey[800],
    justifyContent: "flex-start",
    minWidth: 110,
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
