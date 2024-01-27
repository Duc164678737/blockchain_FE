/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from "react";
import { Container, Stack } from "@mui/material";
import {
  AppButton,
  AppTypography,
  InfoDetailCard,
  TransactionHistoryTable,
} from "components/common";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { useTranslation } from "react-i18next";
import { AppConstant, LangConstant, NFTConstant } from "const";
import { HeroCardDetail } from "components/sn-marketplace";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { InventoryActions, InventorySelector } from "redux-store";
import { useAuthContext } from "context";
import { useTxHistoryTableHeadList, useTxHistoryTableInventoryRowList } from "hooks";
import { GetServerSidePropsContext } from "next";
import { CommonUtils } from "utils";
import { withSellNftController } from "hoc";
import { SellNftControllerProps } from "hoc/withSellNft";
import withStakeNftController, { StakeNftControllerProps } from "hoc/withStakeNft";

const CardDetail = ({ onStartSellCard, onStakeStartCard, isStake }: CardDetailProps) => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const headLabels = useTxHistoryTableHeadList(TABLE_HEAD_LIST);

  const { walletAddress: ownerAddress } = useAuthContext();
  const { t: getLabel } = useTranslation(LangConstant.NS_INVENTORY);

  const nft = useSelector(InventorySelector.getNft, shallowEqual);
  const nftTransaction = useSelector(InventorySelector.getNftTransactionHistory, shallowEqual);

  const tokenId = router.query.id;
  const rowListElement = useTxHistoryTableInventoryRowList(MOCK_DATA_TX_TABLE_ROW);

  const isLoadMore = useMemo(() => {
    return nftTransaction.pageData.length < nftTransaction.pagination.totalItems;
  }, [nftTransaction]);

  const dataToCreatePathApi = useMemo(
    () =>
      tokenId &&
      ownerAddress && { tokenId, ownerAddress, itemClass: NFTConstant.NFT_CLASS_TYPE.card },
    [tokenId, ownerAddress],
  );

  const handleCallTransactionApi = (pageNum = 1) => {
    dispatch(
      InventoryActions.getInventoryNftTransactions({
        data: dataToCreatePathApi,
        params: {
          pageNum,
          size: nftTransaction.pagination.size,
        },
      }),
    );
  };

  useEffect(() => {
    if (dataToCreatePathApi) {
      dispatch(InventoryActions.getNftDetailInventory(dataToCreatePathApi));
      handleCallTransactionApi();
    }
  }, [dataToCreatePathApi]);

  return (
    <Container className={classes.container}>
      <Stack direction="row" justifyContent="space-between" spacing={4}>
        <HeroCardDetail isMarketPlace={false} data={nft} />
        <InfoDetailCard
          className={classes.infoCardDetail}
          isMarketPlace={false}
          data={nft}
          customFooter={
            <Stack spacing={2.5} mt={1} mb={1.5}>
              <AppTypography variant="caption" color="info.light2" lineHeight="14px">
                {getLabel("lStatus")}:{getLabel("lAvailable")}
              </AppTypography>
              <Stack direction="row" spacing={4}>
                <AppButton
                  className={classes.actionBtn}
                  wrapperProps={{
                    className: classes.wrapperBtn,
                  }}
                  variant="contained"
                  onClick={() => onStakeStartCard && onStakeStartCard(nft)}
                >
                  {isStake ? getLabel("lStaking") : getLabel("lStake")}
                </AppButton>
                <AppButton
                  className={classes.actionBtn}
                  wrapperProps={{
                    className: classes.wrapperBtn,
                  }}
                  variant="contained"
                  onClick={() => onStartSellCard(nft, getLabel("lSellCard"))}
                >
                  {getLabel("lSell")}
                </AppButton>
              </Stack>
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
    </Container>
  );
};

interface CardDetailProps extends StakeNftControllerProps, SellNftControllerProps {}

export const getServerSideProps = async (context: GetServerSidePropsContext) =>
  CommonUtils.handleRedirectUnauthorized(context);

export default withSellNftController(withStakeNftController(CardDetail));

const TABLE_HEAD_LIST = ["lType", "lTransactionHash", "lQuantity", "lDate", "lStatus", "lAction"];

const useStyles = makeStyles((theme: ThemeProps) => ({
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },
  wrapperBtn: {
    flex: 1,
  },
  actionBtn: {
    width: "100%",
  },
  infoCardDetail: {
    maxHeight: "unset",
  },
}));

const MOCK_DATA_TX_TABLE_ROW = [
  {
    type: "Deposit",
    transactionHash: "0x22...7aaa1",
    quantity: 100,
    date: 2374623874,
    status: AppConstant.ORDER_STATUS.PENDING,
    actionLabel: "Cancel deposit",
  },
  {
    type: "Deposit",
    transactionHash: "0x22...7aaa1",
    quantity: 100,
    date: 2374623874,
    status: AppConstant.ORDER_STATUS.PENDING,
    actionLabel: "Cancel deposit",
  },
  {
    type: "Deposit",
    transactionHash: "0x22...7aaa1",
    quantity: 100,
    date: 2374623874,
    status: AppConstant.ORDER_STATUS.PENDING,
    actionLabel: "Cancel deposit",
  },
  {
    type: "Deposit",
    transactionHash: "0x22...7aaa1",
    quantity: 100,
    date: 2374623874,
    status: AppConstant.ORDER_STATUS.PENDING,
    actionLabel: "Cancel deposit",
  },
  {
    type: "Deposit",
    transactionHash: "0x22...7aaa1",
    quantity: 100,
    date: 2374623874,
    status: AppConstant.ORDER_STATUS.PENDING,
    actionLabel: "Cancel deposit",
  },
  {
    type: "Deposit",
    transactionHash: "0x22...7aaa1",
    quantity: 100,
    date: 2374623874,
    status: AppConstant.ORDER_STATUS.PENDING,
    actionLabel: "Cancel deposit",
  },
];
