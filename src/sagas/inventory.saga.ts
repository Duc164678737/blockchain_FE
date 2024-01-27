import { ApiResponse } from "apisauce";
import { ApiConstant, AppConstant, NFTConstant } from "const";
import {
  ListTransactionHistoryClass,
  NFTClass,
  NFTListClass,
  PaginationClass,
  TransactionHistoryClass,
} from "models";
import {
  KeyAbleProps,
  ResponseData,
  SagaAction,
  ResponseDataList,
  TypeNftQuery,
} from "models/types";
import { call, put, select } from "redux-saga/effects";
import { InventoryActions, InventorySelector } from "redux-store";
import { InventoryService } from "services";
import { IInventoryNftApi } from "services/inventory.service";

export function* getNftInventoryListRequest(action: {
  type: string;
  data: { filters: TypeNftQuery; ownerAddress: string };
}) {
  try {
    const { filters, ownerAddress } = action.data;

    const response: ApiResponse<ResponseData<NFTListResponse>> = yield call(
      InventoryService.getNftInventory,
      filters,
      ownerAddress,
    );
    const responseData = response?.data;

    if (responseData && responseData.statusCode === ApiConstant.STT_OK) {
      const { pagination } = yield select(InventorySelector.getNftList);
      const nftListData = getNftRequestRevert(responseData.data, pagination);

      yield put(
        InventoryActions.inventorySuccess({
          inventoryList: nftListData,
        }),
      );
    } else {
      yield put(InventoryActions.inventoryFailure(responseData));
    }
  } catch (error) {
    yield put(InventoryActions.inventoryFailure(error));
  }
}

export function* getNftDetailInventoryRequest(action: SagaAction<IInventoryNftApi>) {
  try {
    const { ownerAddress, itemClass, tokenId } = action.data;
    const response: ApiResponse<ResponseData<NFTResponse>> = yield call(
      InventoryService.getNftDetail,
      ownerAddress,
      itemClass,
      tokenId,
    );
    const responseData = response.data;
    if (responseData && responseData.statusCode === ApiConstant.STT_OK) {
      const nft = getNftDetailRequestRevert(responseData.data);

      yield put(
        InventoryActions.inventorySuccess({
          nft,
        }),
      );
    } else {
      yield put(InventoryActions.inventoryFailure(responseData));
    }
  } catch (error) {
    yield put(InventoryActions.inventoryFailure(error));
  }
}

export function* getInventoryNftTransactionsRequest(
  action: SagaAction<{
    data: IInventoryNftApi;
    params: Partial<PaginationClass>;
  }>,
) {
  try {
    const { data, params } = action.data;
    const response: ApiResponse<ResponseDataList<TransactionHistoryClass>> = yield call(
      InventoryService.getNftDetailTransaction,
      data,
      params,
    );
    const responseData = response.data;
    if (responseData && responseData.statusCode === ApiConstant.STT_OK) {
      const { pageData, ...pagination } = responseData.data;
      const listTransaction = pageData.map((item) => new TransactionHistoryClass(item));
      const { pageData: pageDataRedux } = yield select(InventorySelector.getNftTransactionHistory);

      yield put(
        InventoryActions.inventorySuccess({
          nftTransactionHistory: new ListTransactionHistoryClass(
            PaginationClass.createFromResponse(pagination, AppConstant.SIZE_PAGINATION_DEFAULT),
            pageDataRedux.concat(listTransaction),
          ),
        }),
      );
    } else {
      yield put(InventoryActions.inventoryFailure(responseData));
    }
  } catch (error) {
    yield put(InventoryActions.inventoryFailure(error));
  }
}

export function* getNftInGameInventoryRequest(action: {
  type: string;
  data: { filters: TypeNftQuery };
}) {
  try {
    const { filters } = action.data;

    const response: ApiResponse<ResponseData<NFTListResponse>> = yield call(
      InventoryService.getNftInGameInventory,
      filters,
    );
    const responseData = response?.data;

    if (responseData && responseData.statusCode === ApiConstant.STT_OK) {
      const { pagination } = yield select(InventorySelector.getNftList);
      const nftListData = getNftRequestRevert(responseData.data, pagination);

      yield put(
        InventoryActions.inventorySuccess({
          inventoryInGameList: nftListData,
        }),
      );
    } else {
      yield put(InventoryActions.inventoryFailure(responseData));
    }
  } catch (error) {
    yield put(InventoryActions.inventoryFailure(error));
  }
}

export function* getNftDetailInGameInventoryRequest(
  action: SagaAction<{ itemClass: NFTConstant.NFT_CLASS_TYPE; gameItemId: string }>,
) {
  try {
    const { itemClass, gameItemId } = action.data;

    const response: ApiResponse<ResponseData<NFTResponse>> = yield call(
      InventoryService.getNftDetailInGameInventory,
      itemClass,
      gameItemId,
    );
    const responseData = response?.data;

    if (responseData && responseData.statusCode === ApiConstant.STT_OK) {
      const nftInGame = getNftDetailRequestRevert(responseData.data);

      yield put(
        InventoryActions.inventorySuccess({
          nftInGameDetail: nftInGame,
        }),
      );
    } else {
      yield put(InventoryActions.inventoryFailure(responseData));
    }
  } catch (error) {
    yield put(InventoryActions.inventoryFailure(error));
  }
}

function getNftRequestRevert(responseNft: NFTListResponse, pagination: PaginationClass) {
  const nftList = responseNft.pageData || [];
  const newPagination = PaginationClass.createFromResponse(responseNft, pagination.size);

  const newNftList = nftList.map((nft) => new NFTClass({ item: nft }));

  return new NFTListClass(newPagination, newNftList);
}

function getNftDetailRequestRevert(responseNft: NFTResponse) {
  let newNft: KeyAbleProps = {};
  const DELETE_ARRAY = ["Item class", "Item type", "Rarity", "Level"];

  const newItem = responseNft.metadata?.attributes.filter(
    (item) => !DELETE_ARRAY.includes(item.trait_type),
  );

  const itemStats =
    newItem?.map((item: any) => ({
      Value: item.value,
      IconUrl: item.icon_url,
      StatName: item.trait_type,
    })) || [];

  delete responseNft?.metadata;

  newNft = {
    ...responseNft,
    itemStats,
  };

  return new NFTClass({ item: newNft });
}

export type NFTListResponse = {
  pageNum: number;
  total: number;
  pageData: [NFTResponse];
};

type NFTResponse = {
  id: number;
  tokenId: number;
  gameItemId: string;
  itemClass: string;
  rareType: string;
  displayName: string;
  itemType: string;
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
