import { NetworkConstant } from "const";
import {
  ERR_MSG_USER_DENIED_SIGN_ON_MATH_WALLET_ANDROID,
  ERR_MSG_USER_DENIED_SIGN_ON_MATH_WALLET_IOS,
  ERR_MSG_USER_DENIED_SIGN_ON_METAMASK,
  ERR_MSG_USER_DENIED_SIGN_ON_SAFEPAL_WALLET,
  ERR_MSG_USER_DENIED_SIGN_ON_TRUST_WALLET,
  ERR_MSG_USER_REJECTED_SIGN_ON_METAMASK,
} from "const/wallet.const";

export const checkIsCancelSignMessage = (error: any) => {
  const lowercaseErrorMessage = error?.toString()?.toLowerCase() || "";

  return (
    error.code === NetworkConstant.METAMASK_DENIED_REQUEST_CODE ||
    error.code === NetworkConstant.BINANCE_DENIED_REQUEST_CODE ||
    lowercaseErrorMessage.includes(ERR_MSG_USER_REJECTED_SIGN_ON_METAMASK.toLowerCase()) ||
    lowercaseErrorMessage.includes(ERR_MSG_USER_DENIED_SIGN_ON_METAMASK.toLowerCase()) ||
    lowercaseErrorMessage.includes(ERR_MSG_USER_DENIED_SIGN_ON_MATH_WALLET_IOS.toLowerCase()) ||
    lowercaseErrorMessage.includes(ERR_MSG_USER_DENIED_SIGN_ON_MATH_WALLET_ANDROID.toLowerCase()) ||
    lowercaseErrorMessage.includes(ERR_MSG_USER_DENIED_SIGN_ON_SAFEPAL_WALLET.toLowerCase()) ||
    lowercaseErrorMessage.includes(ERR_MSG_USER_DENIED_SIGN_ON_TRUST_WALLET.toLowerCase())
  );
};
