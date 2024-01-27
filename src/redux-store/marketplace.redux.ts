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
import { NFTListClass, NFTClass, ListTransactionHistoryClass } from "models";
import { AppConstant, NFTConstant } from "const";

export const DEFAULT_QUERY_PARAMS = {
  pageNum: AppConstant.DEFAULT_PAGINATION.page,
  pageSize: AppConstant.DEFAULT_PAGINATION.size,
};

export type QueryMarketplaceProps = {
  pageNum: number;
  pageSize: number;
  itemTypes?: Array<NFTConstant.NFT_TYPE>;
  rareTypes?: Array<NFTConstant.RARITY_TYPE>;
  startPrice?: number;
  toPrice?: number;
  level?: number;
  sorts?: { [x: string]: string };
};

/* ------------- Types and Action Creators ------------- */
export const { Types, Creators } = createActions({
  getNftMarketplace: ["data"],
  getNftDetailMarketplace: ["data"],
  getMarketplaceNftTransactions: ["data"],

  marketplaceSuccess: ["data"],
  marketplaceFailure: ["error", "data"],
  marketplaceSet: ["data"],
  marketplaceReset: [],

  marketplaceQueryReset: [],
  setQueryParams: ["data"],
  resetTransactionHistory: [],
});

/* ------------- Initial State ------------- */
export interface IMarketplaceRedux extends IReduxStateCommon {
  nftList: NFTListClass;
  nft: NFTClass;

  nftTransactionHistory: ListTransactionHistoryClass;

  queryMarketplace: QueryMarketplaceProps;
}
export const INITIAL_STATE: IMarketplaceRedux = {
  ...REDUX_STATE,
  nftList: new NFTListClass(),
  nft: new NFTClass({}),

  nftTransactionHistory: new ListTransactionHistoryClass(),

  queryMarketplace: DEFAULT_QUERY_PARAMS,
};

/* ------------- Selector ------------- */
export const Selector = {
  // Get nft marketplace
  getNftList: (state: IAppReduxState) => state.marketplaceRedux.nftList,
  getNft: (state: IAppReduxState) => state.marketplaceRedux.nft,

  getNftTransactionHistory: (state: IAppReduxState) => state.marketplaceRedux.nftTransactionHistory,

  getQueryMarketplace: (state: IAppReduxState) => state.marketplaceRedux.queryMarketplace,
};

/* ------------- Reducers ------------- */
const request = (state = INITIAL_STATE) => requestReducerFunc(state);

const success = (state = INITIAL_STATE, action: object) => successReducerFunc(state, action);

const failure = (state = INITIAL_STATE, action: object) => failureReducerFunc(state, action);

const reset = () => resetReducerFunc(INITIAL_STATE);

const setQueryParamsRequest = (state = INITIAL_STATE, action: any) => setReducerFunc(state, action);

const resetTransactionHistory = (state: any) => ({
  ...state,
  nftTransactionHistory: new ListTransactionHistoryClass(),
});

/* ------------- Mapping ------------- */
const HANDLERS = {
  [Types.GET_NFT_MARKETPLACE]: request,
  [Types.GET_NFT_DETAIL_MARKETPLACE]: request,
  [Types.GET_MARKETPLACE_NFT_TRANSACTIONS]: request,

  [Types.MARKETPLACE_SUCCESS]: success,
  [Types.MARKETPLACE_FAILURE]: failure,
  [Types.MARKETPLACE_SET]: success,
  [Types.MARKETPLACE_RESET]: reset,
  [Types.RESET_TRANSACTION_HISTORY]: resetTransactionHistory,

  [Types.MARKETPLACE_QUERY_RESET]: reset,
  [Types.SET_QUERY_PARAMS]: setQueryParamsRequest,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);

export default Creators;
