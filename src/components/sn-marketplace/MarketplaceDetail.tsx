import React, { ElementType, useEffect, useMemo } from "react";
import { Container, Stack } from "@mui/material";
import { RelatedListingCard, TransactionHistoryTable } from "components/common";
import { makeStyles } from "@mui/styles";
import { ThemeProps } from "models/types";
import { useRouter } from "next/router";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { MarketplaceActions, MarketplaceSelector } from "redux-store";
import { NFTConstant } from "const";
import { useTxHistoryTableHeadList, useTxHistoryTableMarketplaceRowList } from "hooks";
import { useAuthContext } from "context";

const MarketplaceDetail = ({
  nftType,
  CardDetailComponent,
  InfoDetailComponent,
  NftComponent,
}: MarketplaceDetailProps) => {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const headLabels = useTxHistoryTableHeadList(TABLE_HEAD_LIST);
  const { walletAddress } = useAuthContext();

  const nft = useSelector(MarketplaceSelector.getNft, shallowEqual);
  const nftTransaction = useSelector(MarketplaceSelector.getNftTransactionHistory, shallowEqual);

  const id = router.query.id;
  const rowListElement = useTxHistoryTableMarketplaceRowList(nftTransaction.pageData);

  const isSellerAddress = useMemo(() => {
    return nft.sellerAddress === walletAddress.toLowerCase();
  }, [nft.sellerAddress, walletAddress]);

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

  const data = useMemo(() => {
    switch (nftType) {
      case NFTConstant.NFT_CLASS_TYPE.card:
        return nft;
      case NFTConstant.NFT_CLASS_TYPE.box:
      case NFTConstant.NFT_CLASS_TYPE.emote:
      case NFTConstant.NFT_CLASS_TYPE.towerSkin:
        return MOCK_DATA;
      default:
        return nft;
    }
  }, [nft, nftType]);

  useEffect(() => {
    if (id) {
      dispatch(MarketplaceActions.getNftDetailMarketplace(id));
      dispatch(MarketplaceActions.resetTransactionHistory());
      handleCallTransactionApi();
    }
  }, [id]);

  return (
    <Container className={classes.container}>
      <Stack direction="row" spacing={4} justifyContent="space-between">
        <CardDetailComponent data={data} isSellerAddress={isSellerAddress} />
        <InfoDetailComponent data={data} />
      </Stack>
      <TransactionHistoryTable
        headLabels={headLabels}
        rows={rowListElement}
        onGetMore={() => handleCallTransactionApi(nftTransaction.pagination.pageNum + 1)}
        isLoadMore={isLoadMore}
      />
      <RelatedListingCard nftType={nftType} NftComponent={NftComponent} />
    </Container>
  );
};

interface MarketplaceDetailProps {
  nftType: NFTConstant.NFT_CLASS_TYPE;

  InfoDetailComponent: ElementType;
  CardDetailComponent: ElementType;
  NftComponent: ElementType;
}

export default MarketplaceDetail;

const TABLE_HEAD_LIST = ["lTimeUTC", "lTransactionHash", "lWalletAddress", "lType", "lPrice"];

const useStyles = makeStyles((theme: ThemeProps) => ({
  container: {
    maxWidth: 818,
    padding: theme.spacing(10, 0),
  },
}));

// Mock Data for the screen Box, Emote , TowerSkin
const MOCK_DATA = {
  createdAt: "2023-05-08T02:57:27.929Z",
  updatedAt: "2023-05-08T02:57:27.929Z",
  id: "162",
  price: 5,
  quantity: "1",
  sellerAddress: "0x606046238457d690022abf0d1439050ca138155c",
  buyerAddress: null,
  status: "selling",
  saleId: 57,
  description: "Pando Infinity",
  item: {
    createdAt: "2023-03-22T15:52:58.066Z",
    updatedAt: "2023-05-08T02:57:27.929Z",
    id: "49",
    tokenId: 49,
    gameItemId: "C3FF5880CE80B36F",
    itemClass: "card",
    rareType: "rare",
    displayName: "Battle Healer",
    itemType: "troop",
    iconUrl: "https://dev-tzu-game-icon.s3.ap-southeast-1.amazonaws.com/icon/Card/BattleHealer.png",
    level: 3,
    mana: 5,
    description: "",
    userUuid: "8c0c8dd0-2e0f-454c-9fa9-104195116216",
    metadata: {},
  },
};
