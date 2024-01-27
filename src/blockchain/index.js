import { ApiConstant, NetworkConstant } from "const";
import { polygonMethods, polygonTransaction } from "./polygon";

class Blockchain {
  chain;
  transaction;
  methods;

  constructor(initChain) {
    this.chain = initChain || NetworkConstant.CHAIN_SUPPORT.polygon;

    switch (this.chain) {
      case NetworkConstant.CHAIN_SUPPORT.polygon:
        this.chainInfo = NetworkConstant.CHAIN_INFO.polygon;
        this.transaction = polygonTransaction;
        this.methods = polygonMethods;
        break;

      default:
        this.chainInfo = NetworkConstant.CHAIN_INFO.polygon;
        this.transaction = polygonTransaction;
        this.methods = polygonMethods;
        break;
    }

    this.networkUrl = NetworkConstant.isTestnet
      ? this.chainInfo.baseNetworkUrl.testnet
      : this.chainInfo.baseNetworkUrl.mainnet;

    this.chainId = NetworkConstant.isTestnet
      ? this.chainInfo.chainId.testnet
      : this.chainInfo.chainId.mainnet;

    this.rpcUrl = NetworkConstant.isTestnet
      ? this.chainInfo.baseRpcNodeUrl.testnet
      : this.chainInfo.baseRpcNodeUrl.mainnet;
  }

  sendTransaction = (walletAddress, data) => this.transaction.send(walletAddress, data);

  getTransactionResult = (transactionHash) => this.transaction.getResult(transactionHash);

  call = (functionName, ...args) => callBlockchainFunc(this.methods[functionName], ...args);
}

export default Blockchain;

const callBlockchainFunc = async (func, ...args) => {
  let response = { status: ApiConstant.STT_OK, data: {} };

  try {
    response.data = await func(...args);
  } catch (error) {
    response.status = ApiConstant.STT_INTERNAL_SERVER;
    response.data.message = error;
  }

  return response;
};
