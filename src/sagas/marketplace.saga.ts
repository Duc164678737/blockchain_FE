import { ApiResponse } from "apisauce";
import { ApiConstant, AppConstant, NFTConstant } from "const";
import { ListTransactionHistoryClass, NFTClass, PaginationClass } from "models";
import TransactionHistory from "models/classes/TransactionHistory";
import {
  KeyAbleProps,
  ResponseData,
  ResponseDataList,
  SagaAction,
  TypeNftQuery,
} from "models/types";
import { call, put, select } from "redux-saga/effects";
import { MarketplaceActions, MarketplaceSelector } from "redux-store";
import { MarketplaceService } from "services";

export function* getNftListRequest(action: { type: string; data: TypeNftQuery }) {
  try {
    const filters = action.data;
    const response: ApiResponse<ResponseDataList<NFTClass>> = yield call(
      MarketplaceService.getNftMarketPlace,
      filters,
    );
    const responseData = response?.data;
    if (responseData && responseData.statusCode === ApiConstant.STT_OK) {
      const nftListData = responseData.data;
      const { pagination } = yield select(MarketplaceSelector.getNftList);
      const totalItems = nftListData.total;
      const totalPages = Math.ceil(totalItems / pagination.size);

      yield put(
        MarketplaceActions.marketplaceSuccess({
          nftList: {
            pageData: nftListData.pageData.map((item) => new NFTClass(item)),
            pagination: {
              ...pagination,
              pageNum: nftListData.pageNum,
              totalPages,
              totalItems,
            },
          },
        }),
      );
    } else {
      yield put(MarketplaceActions.marketplaceFailure(responseData));
    }
  } catch (error) {
    yield put(MarketplaceActions.marketplaceFailure(error));
  }
}

export function* getNftDetailRequest(action: SagaAction<string>) {
  try {
    const id = action.data;
    const response: ApiResponse<ResponseData<NFTResponse>> = yield call(
      MarketplaceService.getNftDetail,
      id,
    );
    const responseData = response.data;
    if (responseData && responseData.statusCode === ApiConstant.STT_OK) {
      const nft = getNftDetailRequestRevert(responseData.data);

      yield put(
        MarketplaceActions.marketplaceSuccess({
          nft,
        }),
      );
    } else {
      yield put(MarketplaceActions.marketplaceFailure(responseData));
    }
  } catch (error) {
    yield put(MarketplaceActions.marketplaceFailure(error));
  }
}

export function* getNftMarketplaceTransactionsRequest(
  action: SagaAction<{
    id: number;
    params: Partial<PaginationClass>;
  }>,
) {
  try {
    const { id, params } = action.data;
    const response: ApiResponse<ResponseDataList<TransactionHistory>> = yield call(
      MarketplaceService.getNftDetailTransaction,
      id,
      params,
    );
    const responseData = response.data;
    if (responseData && responseData.statusCode === ApiConstant.STT_OK) {
      const { pageData, ...pagination } = responseData.data;
      const listTransaction = pageData.map((item) => new TransactionHistory(item));
      const { pageData: pageDataRedux } = yield select(
        MarketplaceSelector.getNftTransactionHistory,
      );
      yield put(
        MarketplaceActions.marketplaceSuccess({
          nftTransactionHistory: new ListTransactionHistoryClass(
            PaginationClass.createFromResponse(pagination, AppConstant.SIZE_PAGINATION_DEFAULT),
            pageDataRedux.concat(listTransaction),
          ),
        }),
      );
    } else {
      yield put(MarketplaceActions.marketplaceFailure(responseData));
    }
  } catch (error) {
    yield put(MarketplaceActions.marketplaceFailure(error));
  }
}

function getNftDetailRequestRevert(responseNft: NFTResponse) {
  let newNft: KeyAbleProps = {};
  const DELETE_ARRAY = ["Item class", "Item type", "Rarity", "Level"];

  const newItem = responseNft.item?.metadata?.attributes.filter(
    (item) => !DELETE_ARRAY.includes(item.trait_type),
  );

  const itemStats =
    newItem?.map((item: any) => ({
      Value: item.value,
      IconUrl: item.icon_url,
      StatName: item.trait_type,
    })) || [];

  delete responseNft?.item?.metadata;

  newNft = {
    ...responseNft,
    item: {
      ...responseNft.item,
      itemStats,
    },
  };

  return new NFTClass(newNft);
}

export type NFTResponse = {
  createdAt: string;
  updatedAt: string;
  id: number;
  price: number;
  quantity: number;
  sellerAddress: string;
  buyerAddress: string;
  status: string;
  saleId: number;
  item: {
    id: number;
    tokenId: number;
    gameItemId: string;
    itemClass: NFTConstant.NFT_CLASS_TYPE;
    rareType: NFTConstant.RARITY_TYPE;
    displayName: string;
    itemType: NFTConstant.NFT_TYPE;
    iconUrl: string;
    level: number;
    mana: number;
    description: string;
    ownerAddress: string;
    metadata?: {
      name: string;
      image: string;
      attributes: [
        {
          value: string;
          icon_url: string;
          trait_type: string;
        },
      ];
      description: string;
    };
    quantity: number;
  };
};
