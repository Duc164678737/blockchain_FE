import apisauce, { ApiResponse, ApisauceConfig } from "apisauce";
import { ApiConstant, AppConstant } from "const";
import Cookie from "js-cookie";
import { isNil } from "lodash";

const DEFAULT_CONFIG: ApisauceConfig = {
  baseURL: ApiConstant.FRONT_END_API_URL,
  headers: { ...ApiConstant.HEADER_DEFAULT },
  timeout: ApiConstant.TIMEOUT,
};

const handleErrorRequest = (response: ApiResponse<IApiResponse>) => {
  if (
    isNil(response.status) ||
    ![ApiConstant.STT_OK, ApiConstant.STT_CREATED].includes(response.status)
  ) {
    console.log("Response error", response);
  }
};

const Api = apisauce.create(DEFAULT_CONFIG);
Api.addResponseTransform(handleErrorRequest);

export default Api;

const createInstance = (token?: string) => {
  const newToken = token || Cookie.get(AppConstant.KEY_TOKEN);

  newToken && Api.setHeader("Authorization", `Bearer ${newToken}`);

  return Api;
};

export const createApi = (token?: string) => createInstance(token);

export interface IApiResponse {
  status: number;
  data: object;
}
