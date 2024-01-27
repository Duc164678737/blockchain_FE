import Api from "api";
import { ApiConstant } from "const";

export const getAccount = () => Api.get(ApiConstant.GET_PROFILE);

export const handleGetNonce = (walletAddress: string) =>
  Api.post(ApiConstant.GET_NONCE, { walletAddress });

export const loginWallet = (walletAddress: string, signature: string) =>
  Api.post(ApiConstant.LOGIN_WALLET, { walletAddress, signature });
