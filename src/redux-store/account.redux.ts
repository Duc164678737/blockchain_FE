import { IAppReduxState } from "./index";
import { createActions, createReducer } from "reduxsauce";
import {
  IReduxStateCommon,
  REDUX_STATE,
  requestReducerFunc,
  failureReducerFunc,
  successReducerFunc,
  resetReducerFunc,
} from "./redux-structure";
import { AccountClass } from "models";

/* ------------- Types and Action Creators ------------- */
export const { Types, Creators } = createActions({
  getAccount: ["data"],

  accountSuccess: ["data"],
  accountFailure: ["error", "data"],
  accountSet: ["data"],
  accountReset: [],
});

/* ------------- Initial State ------------- */
export interface IAccountRedux extends IReduxStateCommon {
  account: AccountClass;
}
export const INITIAL_STATE: IAccountRedux = {
  ...REDUX_STATE,

  account: new AccountClass({ email: "hieu@gmail.com", name: "hieu" }),
};

/* ------------- Selector ------------- */
export const Selector = {
  // Get Account info
  getAccountInfo: (state: IAppReduxState) => state.accountRedux.account,
};

/* ------------- Reducers ------------- */
const request = (state = INITIAL_STATE) => requestReducerFunc(state);

const success = (state = INITIAL_STATE, action: object) => successReducerFunc(state, action);

const failure = (state = INITIAL_STATE, action: object) => failureReducerFunc(state, action);

const reset = () => resetReducerFunc(INITIAL_STATE);

/* ------------- Mapping ------------- */
const HANDLERS = {
  [Types.GET_ACCOUNT]: request,

  [Types.ACCOUNT_SUCCESS]: success,
  [Types.ACCOUNT_FAILURE]: failure,
  [Types.ACCOUNT_SET]: success,
  [Types.ACCOUNT_RESET]: reset,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);

export default Creators;
