import React, { ElementType, useEffect } from "react";
import { Container, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { useTranslation } from "react-i18next";
import { AppConstant, LangConstant, NFTConstant } from "const";
import {
  AppButton,
  AppTypography,
  InfoDetailCard,
  TransactionHistoryTable,
} from "components/common";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { InventoryActions, InventorySelector } from "redux-store";
import { useRouter } from "next/router";
import withUnStakeNftController, { UnStakeNftControllerProps } from "hoc/withUnStakeNft";
import { useTxHistoryTableHeadList, useTxHistoryTableInventoryRowList } from "hooks";

const InventoryInGameDetail = ({
  nftType,
  DetailInGameInventoryCard,
  onUnStakeCard,
  isUnStaking,
}: DetailInGameProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const headLabels = useTxHistoryTableHeadList(TABLE_HEAD_INVENTORY);
  const { t: getLabel } = useTranslation(LangConstant.NS_INVENTORY);
  const rowListElement = useTxHistoryTableInventoryRowList(MOCK_DATA_TX_TABLE_ROW);

  const nftInGameDetail = useSelector(InventorySelector.getNftInGameDetail, shallowEqual);

  const { id } = router.query;

  useEffect(() => {
    dispatch(
      InventoryActions.getNftDetailInGameInventory({
        itemClass: nftType,
        gameItemId: id,
      }),
    );
  }, [id, nftType]);

  return (
    <Container className={classes.container}>
      <Stack direction="row" justifyContent="space-between" spacing={4}>
        <DetailInGameInventoryCard isMarketPlace={false} data={nftInGameDetail} />
        <InfoDetailCard
          className={classes.infoCardDetail}
          isMarketPlace={false}
          data={nftInGameDetail}
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
                variant="contained"
                onClick={() => onUnStakeCard(nftInGameDetail, nftType)}
              >
                {!isUnStaking ? getLabel("lUnstake") : getLabel("lUnstaking")}
              </AppButton>
            </Stack>
          }
        />
      </Stack>
      <TransactionHistoryTable
        headLabels={headLabels}
        rows={rowListElement}
        onGetMore={() => {
          return;
        }}
        isLoadMore={false}
      />
    </Container>
  );
};

export default withUnStakeNftController(InventoryInGameDetail);

interface DetailInGameProps extends UnStakeNftControllerProps {
  nftType: NFTConstant.NFT_CLASS_TYPE;
  DetailInGameInventoryCard: ElementType;
}

const useStyles = makeStyles((theme: ThemeProps) => ({
  container: {
    padding: theme.spacing(10, 10),
  },
  wrapperBtn: {
    width: "100%",
  },
  actionBtn: {
    width: "100%",
  },
  infoCardDetail: {
    maxHeight: "unset",
  },
}));

// TOTO: update data when have Api
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

const TABLE_HEAD_INVENTORY = [
  "lType",
  "lTransactionHash",
  "lQuantity",
  "lDate",
  "lStatus",
  "lAction",
];
