import Chain from "models/chain.model";

const NETWORK_TYPE = {
  mainnet: "mainnet",
  testnet: "testnet",
};

export const isTestnet = process.env.CHAIN_NETWORK === NETWORK_TYPE.testnet;

export const CHAIN_SUPPORT = {
  polygon: "polygon",
};

export const CHAIN_INFO = {
  [CHAIN_SUPPORT.polygon]: {
    chainId: {
      mainnet: 137,
      testnet: 80001,
    },
    baseNetworkUrl: {
      mainnet: "https://polygonscan.com/",
      testnet: "https://explorer-mumbai.maticvigil.com/",
    },
    baseRpcNodeUrl: {
      mainnet: "https://polygon-rpc.com/",
      testnet: "https://polygon-mumbai.blockpi.network/v1/rpc/public",
    },
  },
};

export const CONNECTOR_IDS = {
  // polygon
  metamask: "meta-mask",
  walletConnect: "walletconnect",
};

export const METAMASK_DENIED_REQUEST_CODE = 4001;
export const BINANCE_DENIED_REQUEST_CODE = -32603;
export const PENDING_WALLET_REQUEST = -32002;

export const POOLING_TRANSACTION_STATUS_TIME_IN_MILLISECOND = 3000;
export const MAXIMUM_POOLING_TRANSACTION_EXECUTE =
  600000 / POOLING_TRANSACTION_STATUS_TIME_IN_MILLISECOND; // 200 time function execute - 10 minutes

export const POLYGON_TRANSACTION_STATUS = {
  failed: 0,
  success: 1,
};

export const BASE_RPC_NODE_URL = new Chain().rpcUrl;
