import { NetworkConstant } from "const";
import { MetamaskIcon, WalletConnectIcon } from "public/images";

export const POLYGON_WALLET_OPTIONS = [
  {
    iconSrc: MetamaskIcon,
    walletName: "MetaMask",
    connectorId: NetworkConstant.CONNECTOR_IDS.metamask,
  },
  {
    iconSrc: WalletConnectIcon,
    walletName: "Wallet Connect",
    connectorId: NetworkConstant.CONNECTOR_IDS.walletConnect,
  },
];

export const CONNECTOR_ID_KEY = "connectorId";
export const WALLET_CONNECT_CONNECTOR_KEY = "walletconnect";

export const METAMASK_DENIED_REQUEST_CODE = 4001;
export const BINANCE_DENIED_REQUEST_CODE = -32603;
export const ERR_MSG_USER_REJECTED_SIGN_ON_METAMASK = "user rejected signing";
export const ERR_MSG_USER_DENIED_SIGN_ON_METAMASK = "User denied message signature";
export const ERR_MSG_USER_DENIED_SIGN_ON_MATH_WALLET_IOS = "Request rejected";
export const ERR_MSG_USER_DENIED_SIGN_ON_MATH_WALLET_ANDROID = "cancel";
export const ERR_MSG_USER_DENIED_SIGN_ON_SAFEPAL_WALLET = "User Cancel";
export const ERR_MSG_USER_DENIED_SIGN_ON_TRUST_WALLET = "User canceled";
