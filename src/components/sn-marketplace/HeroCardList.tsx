import React, { useEffect, FC } from "react";
import { Box } from "@mui/material";
import { AppConstant, NFTConstant, PathConstant } from "const";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { MarketplaceActions, MarketplaceSelector } from "redux-store";
import { HeroCard } from "../common/card";
import { convertReduxQueryFromUrlQuery, getObjectSearchParams } from "utils/query.utils";
import { QueryMarketplaceProps } from "redux-store/marketplace.redux";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { HeroCardProps } from "components/common/card/HeroCard";
import { NFTClass } from "models";
import { useAuthContext } from "context";
import { withBuyNftMarketplaceController } from "hoc";
import { WithBuyNFTMarketplaceComponentProps } from "hoc/withBuyNftMarketplace";

const HeroCardList: FC<HeroCardWithBuyProps> = ({ onStartBuyCard }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { walletAddress } = useAuthContext();

  const { pageData } = useSelector(MarketplaceSelector.getNftList, shallowEqual);
  const marketplaceQuery = useSelector(MarketplaceSelector.getQueryMarketplace, shallowEqual);

  const handleGetNftList = (query: QueryMarketplaceProps) => {
    dispatch(
      MarketplaceActions.getNftMarketplace({
        ...query,
        itemClass: NFTConstant.NFT_CLASS_TYPE.card,
      }),
    );
  };

  useEffect(() => {
    const searchObj = getObjectSearchParams();
    if (searchObj && Object.keys(searchObj).length) {
      const reduxQuery = convertReduxQueryFromUrlQuery(marketplaceQuery, searchObj);

      dispatch(MarketplaceActions.setQueryParams({ queryMarketplace: reduxQuery }));
    } else {
      dispatch(
        MarketplaceActions.setQueryParams({
          queryMarketplace: {
            ...marketplaceQuery,
            sorts: {
              [NFTConstant.NFT_SORT_KEY.date]: AppConstant.SORT_DIRECTION.desc,
            },
          },
        }),
      );
    }

    return () => {
      dispatch(MarketplaceActions.marketplaceReset());
    };
  }, []);

  useEffect(() => {
    handleGetNftList(marketplaceQuery);
  }, [marketplaceQuery]);

  return (
    <Box className={classes.container}>
      {pageData.map((item: NFTClass, index) => {
        const isSellerAddress = item.sellerAddress === walletAddress.toLowerCase();
        return (
          <HeroCard
            data={item}
            key={index}
            pathname={PathConstant.MARKETPLACE_CARD_DETAIL}
            id={String(item.id)}
            isSellerAddress={isSellerAddress}
            onClickedBuy={onStartBuyCard}
          />
        );
      })}
    </Box>
  );
};
export default withBuyNftMarketplaceController<HeroCardWithBuyProps>(HeroCardList);

interface HeroCardWithBuyProps extends HeroCardProps, WithBuyNFTMarketplaceComponentProps {}

export const useStyles = makeStyles((theme: ThemeProps) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    columnGap: theme.spacing(4.375),
    rowGap: theme.spacing(3),
  },
}));
