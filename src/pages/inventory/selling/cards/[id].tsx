import React, { useEffect, useMemo } from "react";
import { Container, Stack } from "@mui/material";
import {
  AppButton,
  AppTypography,
  HeroCard,
  InfoDetailCard,
  TransactionHistoryTable,
  RelatedListingCard,
} from "components/common";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { useTranslation } from "react-i18next";
import { LangConstant, NFTConstant } from "const";
import { HeroCardDetail } from "components/sn-marketplace";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { MarketplaceActions, MarketplaceSelector } from "redux-store";
import { useTxHistoryTableHeadList, useTxHistoryTableMarketplaceRowList } from "hooks";
import { CommonUtils } from "utils";
import { GetServerSidePropsContext } from "next";
import { withCancelSellNftController } from "hoc";
import { CancelSellNftControllerProps } from "hoc/withCancelSellNft";

const CardDetail = ({ onCancelStartSellCard, isCancelSell }: CancelSellNftControllerProps) => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const { t: getLabel } = useTranslation(LangConstant.NS_INVENTORY);
  const headLabels = useTxHistoryTableHeadList(TABLE_HEAD_LIST);

  const nft = useSelector(MarketplaceSelector.getNft, shallowEqual);
  const nftTransaction = useSelector(MarketplaceSelector.getNftTransactionHistory, shallowEqual);

  const { id } = router.query;
  const rowListElement = useTxHistoryTableMarketplaceRowList(nftTransaction.pageData);

  const handleCancelSellCard = () => {
    onCancelStartSellCard && onCancelStartSellCard(nft);
  };

  const isLoadMore = useMemo(() => {
    return nftTransaction.pageData.length < nftTransaction.pagination.totalItems;
  }, [nftTransaction]);

  const handleCallTransactionApi = (pageNum = 1) => {
    dispatch(
      MarketplaceActions.getMarketplaceNftTransactions({
        id,
        params: {
          pageNum,
          size: nftTransaction.pagination.size,
        },
      }),
    );
  };

  useEffect(() => {
    if (id) {
      dispatch(MarketplaceActions.getNftDetailMarketplace(id));
      handleCallTransactionApi();
    }
  }, [id]);

  return (
    <Container className={classes.container}>
      <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }} spacing={4}>
        <HeroCardDetail
          isMarketPlace={false}
          data={nft}
          onStartBuyCard={(nft) => {
            return nft;
          }}
        />
        <InfoDetailCard
          className={classes.infoCardDetail}
          isMarketPlace={false}
          data={nft}
          customFooter={
            <Stack spacing={2.5} mt={1} mb={1.5}>
              <AppTypography variant="caption" color="info.light2" lineHeight="14px">
                {getLabel("lStatus")}:{getLabel("lAvailable")}
              </AppTypography>
              <AppButton
                className={classes.actionBtn}
                wrapperProps={{
                  className: classes.wrapperBtn,
                }}
                variant={nft.status === NFTConstant.NFT_STATUS.selling ? "contained" : "text"}
                disabled={nft.status === NFTConstant.NFT_STATUS.cancelled}
                onClick={handleCancelSellCard}
              >
                {isCancelSell ? getLabel("lCanceling") : getLabel("lCancelSell")}
              </AppButton>
            </Stack>
          }
        />
      </Stack>
      <TransactionHistoryTable
        headLabels={headLabels}
        rows={rowListElement}
        onGetMore={() => handleCallTransactionApi(nftTransaction.pagination.pageNum + 1)}
        isLoadMore={isLoadMore}
      />
      <RelatedListingCard nftType={NFTConstant.NFT_CLASS_TYPE.card} NftComponent={HeroCard} />
    </Container>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  CommonUtils.handleRedirectUnauthorized(context);

export default withCancelSellNftController(CardDetail);

const TABLE_HEAD_LIST = ["lTimeUTC", "lTransactionHash", "lWalletAddress", "lType", "lPrice"];

const useStyles = makeStyles((theme: ThemeProps) => ({
  container: {
    maxWidth: 818,
    padding: theme.spacing(10, 0),
  },
  wrapperBtn: {
    flex: 1,
    width: "100%",
  },
  actionBtn: {
    width: "100%",
  },
  infoCardDetail: {
    maxHeight: "unset",
  },
}));
