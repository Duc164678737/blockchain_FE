import { ApiResponse } from "apisauce";
import { put, call } from "redux-saga/effects";
import { AccountActions, IAccountRedux } from "redux-store";
import { AccountService } from "services";
import { ApiConstant, EnvConstant } from "const";

export function* getAccountRequest() {
  try {
    const response: ApiResponse<IAccountRedux> = yield call(AccountService.getAccount);

    const responseData = response.data;

    if (response.status === ApiConstant.STT_OK) {
      yield put(AccountActions.accountSuccess({ account: responseData }));
    } else {
      yield put(AccountActions.accountFailure(responseData));
    }
  } catch (error) {
    EnvConstant.IS_DEV && console.log(error);
    yield put(AccountActions.accountFailure(error));
  }
}
