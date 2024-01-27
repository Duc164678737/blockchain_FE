import { isTestnet, CHAIN_SUPPORT, CHAIN_INFO } from "const/network.const";

class Chain {
  chain;
  chainInfo;
  networkUrl;
  chainId;
  rpcUrl;

  constructor(initChain?: string) {
    this.chain = initChain || CHAIN_SUPPORT.polygon;

    switch (this.chain) {
      case CHAIN_SUPPORT.polygon:
        this.chainInfo = CHAIN_INFO.polygon;
        break;
      default:
        this.chainInfo = CHAIN_INFO.polygon;
        break;
    }

    this.networkUrl = isTestnet
      ? this.chainInfo.baseNetworkUrl.testnet
      : this.chainInfo.baseNetworkUrl.mainnet;
    this.chainId = isTestnet ? this.chainInfo.chainId.testnet : this.chainInfo.chainId.mainnet;
    this.rpcUrl = isTestnet
      ? this.chainInfo.baseRpcNodeUrl.testnet
      : this.chainInfo.baseRpcNodeUrl.mainnet;
  }
}

export default Chain;
