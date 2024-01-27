import React, { ElementType, useMemo } from "react";
import { Container, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { useTranslation } from "react-i18next";
import { AppConstant, LangConstant, NFTConstant } from "const";
import { SellAndStakeInputForm, UnstakeForm } from "components/sn-inventory";
import { AppButton, TransactionHistoryTable } from "components/common";
import clsx from "clsx";
import { useTxHistoryTableHeadList, useTxHistoryTableInventoryRowList } from "hooks";

const InventoryWalletSemiNftDetail = ({
  DetailInventorySemiNft,
  typeSemiNftLabelUnstake,
  typeSemiNftLabelSellAndStake,
  typeItemClass,
}: DetailSellingProps) => {
  const classes = useStyles();
  const { t: getLabel } = useTranslation(LangConstant.NS_INVENTORY);
  const headLabels = useTxHistoryTableHeadList(TABLE_HEAD_LIST);

  const rowListElement = useTxHistoryTableInventoryRowList(MOCK_DATA_TX_TABLE_ROW);

  const data = useMemo(() => {
    switch (typeItemClass) {
      case NFTConstant.NFT_CLASS_TYPE.box:
      case NFTConstant.NFT_CLASS_TYPE.emote:
      case NFTConstant.NFT_CLASS_TYPE.towerSkin:
        return MOCK_DATA;
      default:
        return MOCK_DATA;
    }
  }, [typeItemClass]);

  return (
    <Container className={clsx(classes.container)}>
      <Stack spacing={6.5}>
        <Stack direction="row" justifyContent="space-between" spacing={10}>
          <DetailInventorySemiNft data={data} />
          <Stack flex={1} justifyContent="space-between">
            {data.item?.quantity && (
              <>
                <SellAndStakeInputForm
                  typeSemiNftLabel={typeSemiNftLabelSellAndStake}
                  totalBox={data.item?.quantity}
                  sellButton={
                    <AppButton
                      className={classes.actionBtn}
                      wrapperProps={{ className: classes.actionBtn }}
                    >
                      {getLabel("lSell")}
                    </AppButton>
                  }
                  stakeButton={
                    <AppButton
                      className={classes.actionBtn}
                      wrapperProps={{ className: classes.actionBtn }}
                      variant="contained"
                    >
                      {getLabel("lStake")}
                    </AppButton>
                  }
                />
                <UnstakeForm
                  totalBox={data.item?.quantity}
                  typeNftLabel={typeSemiNftLabelUnstake}
                  button={
                    <AppButton variant="contained" className={classes.unStakeBtn}>
                      {getLabel("lUnstake")}
                    </AppButton>
                  }
                />
              </>
            )}
          </Stack>
        </Stack>
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

type DetailSellingProps = {
  typeSemiNftLabelUnstake: string;
  typeSemiNftLabelSellAndStake: string;
  typeItemClass: string;
  DetailInventorySemiNft: ElementType;
};

export default InventoryWalletSemiNftDetail;

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
  unStakeBtn: {
    minWidth: 193,
  },
}));

// Mock Data for the screen Box, Emote , TowerSkin
const MOCK_DATA = {
  item: {
    createdAt: "2023-05-24T06:25:07.796Z",
    description: "",
    displayName: "Bomber",
    gameItemId: "9218BC99D54CBF23",
    iconUrl: "https://dev-tzu-game-icon.s3.ap-southeast-1.amazonaws.com/icon/Card/Bomber.png",
    id: "2",
    itemClass: "card",
    itemStats: [],
    itemType: "troop",
    level: 3,
    mana: 4,
    ownerAddress: "0x606046238457d690022abf0d1439050ca138155c",
    quantity: 1,
    rareType: "common",
    tokenId: 2,
    updatedAt: "2023-05-24T06:38:17.272Z",
    userUuid: "b0e81865-7e2f-4274-b847-b6778cb28105",
  },
};
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
