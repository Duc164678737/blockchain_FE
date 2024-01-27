/**
 * Saga index: connects action type and saga
 */

import { takeLatest, all } from "redux-saga/effects";

/* ------------- Types ------------- */
import { AccountTypes, MarketplaceTypes, InventoryTypes } from "redux-store";

/* ------------- Sagas ------------- */
import { getAccountRequest } from "./account.saga";
import {
  getNftDetailRequest,
  getNftListRequest,
  getNftMarketplaceTransactionsRequest,
} from "./marketplace.saga";

import {
  getNftInventoryListRequest,
  getNftDetailInventoryRequest,
  getInventoryNftTransactionsRequest,
  getNftInGameInventoryRequest,
  getNftDetailInGameInventoryRequest,
} from "./inventory.saga";
/* ------------- Connect Types To Sagas ------------- */
function* rootSaga() {
  yield all([
    // Account setting
    takeLatest(AccountTypes.GET_ACCOUNT, getAccountRequest),

    // Market
    takeLatest(MarketplaceTypes.GET_NFT_MARKETPLACE, getNftListRequest),
    takeLatest(MarketplaceTypes.GET_NFT_DETAIL_MARKETPLACE, getNftDetailRequest),
    takeLatest(
      MarketplaceTypes.GET_MARKETPLACE_NFT_TRANSACTIONS,
      getNftMarketplaceTransactionsRequest,
    ),

    // Inventory
    takeLatest(InventoryTypes.GET_NFT_INVENTORY, getNftInventoryListRequest),
    takeLatest(InventoryTypes.GET_NFT_DETAIL_INVENTORY, getNftDetailInventoryRequest),
    takeLatest(InventoryTypes.GET_INVENTORY_NFT_TRANSACTIONS, getInventoryNftTransactionsRequest),
    takeLatest(InventoryTypes.GET_NFT_IN_GAME_INVENTORY, getNftInGameInventoryRequest),
    takeLatest(InventoryTypes.GET_NFT_DETAIL_IN_GAME_INVENTORY, getNftDetailInGameInventoryRequest),
  ]);
}

export default rootSaga;
