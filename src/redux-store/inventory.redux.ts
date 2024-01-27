import { IAppReduxState } from "./index";
import { createActions, createReducer } from "reduxsauce";
import {
  IReduxStateCommon,
  REDUX_STATE,
  requestReducerFunc,
  failureReducerFunc,
  successReducerFunc,
  resetReducerFunc,
  setReducerFunc,
} from "./redux-structure";
import { NFTClass, NFTListClass, ListTransactionHistoryClass } from "models";
import { AppConstant, NFTConstant } from "const";

export const DEFAULT_QUERY_PARAMS = {
  pageNum: AppConstant.DEFAULT_PAGINATION.page,
  pageSize: AppConstant.DEFAULT_PAGINATION.size,
};

export type QueryInventoryProps = {
  pageNum: number;
  pageSize: number;
  itemTypes?: Array<NFTConstant.NFT_TYPE>;
  rareTypes?: Array<NFTConstant.RARITY_TYPE>;
  level?: number;
  sorts?: { [x: string]: string };
};

/* ------------- Types and Action Creators ------------- */
export const { Types, Creators } = createActions({
  getNftInventory: ["data"],
  getNftDetailInventory: ["data"],
  getInventoryNftTransactions: ["data"],
  getNftInGameInventory: ["data"],
  getNftDetailInGameInventory: ["data"],

  inventorySuccess: ["data"],
  inventoryFailure: ["error", "data"],
  inventorySet: ["data"],
  inventoryReset: [],

  inventoryQueryReset: [],
  setQueryParams: ["data"],
});

/* ------------- Initial State ------------- */
export interface IInventoryRedux extends IReduxStateCommon {
  inventoryList: NFTListClass;
  nft: NFTClass;

  nftTransactionHistory: ListTransactionHistoryClass;

  inventoryInGameList: NFTListClass;
  nftInGameDetail: NFTClass;

  queryInventory: QueryInventoryProps;
}
export const INITIAL_STATE: IInventoryRedux = {
  ...REDUX_STATE,
  inventoryList: new NFTListClass(),
  nft: new NFTClass({}),

  nftTransactionHistory: new ListTransactionHistoryClass(),

  inventoryInGameList: new NFTListClass(),
  nftInGameDetail: new NFTClass({}),

  queryInventory: DEFAULT_QUERY_PARAMS,
};

/* ------------- Selector ------------- */
export const Selector = {
  // Get inventory
  getNftList: (state: IAppReduxState) => state.inventoryRedux.inventoryList,
  getNft: (state: IAppReduxState) => state.inventoryRedux.nft,

  getNftTransactionHistory: (state: IAppReduxState) => state.inventoryRedux.nftTransactionHistory,

  getNftInGameList: (state: IAppReduxState) => state.inventoryRedux.inventoryInGameList,
  getNftInGameDetail: (state: IAppReduxState) => state.inventoryRedux.nftInGameDetail,

  getQueryInventory: (state: IAppReduxState) => state.inventoryRedux.queryInventory,
};

/* ------------- Reducers ------------- */
const request = (state = INITIAL_STATE) => requestReducerFunc(state);

const success = (state = INITIAL_STATE, action: object) => successReducerFunc(state, action);

const failure = (state = INITIAL_STATE, action: object) => failureReducerFunc(state, action);

const reset = () => resetReducerFunc(INITIAL_STATE);

const setQueryParamsRequest = (state = INITIAL_STATE, action: any) => setReducerFunc(state, action);

/* ------------- Mapping ------------- */
const HANDLERS = {
  [Types.GET_NFT_INVENTORY]: request,
  [Types.GET_NFT_DETAIL_INVENTORY]: request,
  [Types.GET_INVENTORY_NFT_TRANSACTIONS]: request,
  [Types.GET_NFT_IN_GAME_INVENTORY]: request,
  [Types.GET_NFT_DETAIL_IN_GAME_INVENTORY]: request,

  [Types.INVENTORY_SUCCESS]: success,
  [Types.INVENTORY_FAILURE]: failure,
  [Types.INVENTORY_SET]: success,
  [Types.INVENTORY_RESET]: reset,

  [Types.INVENTORY_QUERY_RESET]: reset,
  [Types.SET_QUERY_PARAMS]: setQueryParamsRequest,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);

export default Creators;
