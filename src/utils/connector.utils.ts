import { Web3Provider } from "@ethersproject/providers";
import { EnvConstant, NetworkConstant, WalletConstant } from "const";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import Blockchain from "blockchain";
import { ethers } from "ethers";

export const injectedConnector = () => {
  const { chainId } = new Blockchain();

  return new InjectedConnector({
    supportedChainIds: [parseInt(chainId.toString(), 10)],
  });
};

const { chainId, rpcUrl } = new Blockchain();
export const walletConnectConnector = new WalletConnectConnector({
  rpc: { [chainId as number]: rpcUrl },
  qrcode: true,
  pollingInterval: 12000, // polling until found
  storageId: WalletConstant.WALLET_CONNECT_CONNECTOR_KEY,
});

export const clearWalletConnectConnector = () => {
  if (
    localStorage.getItem(WalletConstant.CONNECTOR_ID_KEY) ===
      NetworkConstant.CONNECTOR_IDS.walletConnect &&
    walletConnectConnector instanceof WalletConnectConnector
  ) {
    walletConnectConnector.close();
    walletConnectConnector.walletConnectProvider = null;
  }
};

export const getLibrary = (provider: any) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

/**
 * Get current connector id in local storage
 *
 * @return {string} Connector id (values specified in CONNECTOR_IDS constant)
 *
 */
export const getCurrentConnectorId = () => {
  return typeof window !== "undefined"
    ? window.localStorage.getItem(WalletConstant.CONNECTOR_ID_KEY) || ""
    : "";
};

/**
 * Get current connected wallet address
 *
 * @param {string} - Connector id
 *
 * @return {object} - Current provider
 *
 */
export const getCurrentProvider = () => {
  const connectorId = getCurrentConnectorId();
  if (connectorId === NetworkConstant.CONNECTOR_IDS.metamask) {
    return window.ethereum;
  } else if (connectorId === NetworkConstant.CONNECTOR_IDS.walletConnect) {
    return walletConnectConnector.walletConnectProvider;
  } else {
    return null;
  }
};

/**
 * Get current connected wallet address
 *
 * @param {object} currentProvider - Current provider(window.ethereum || window.BinanceChain)
 *
 * @return {string} Wallet address
 *
 */
export const getCurrentBscAddress = async (currentProvider: any) => {
  if (!currentProvider) return;
  const provider = new ethers.providers.Web3Provider(currentProvider, "any");
  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  return address;
};

/**
 * Setup Bsc network
 *
 * @param {object} provider - Provider provider(window.ethereum || window.BinanceChain)
 *
 * @return {boolean} Boolean value whether has success setup bsc network or not
 *
 */
export const setupPolygonNetwork = async (provider: any) => {
  if (provider) {
    const { chainId, rpcUrl, networkUrl } = new Blockchain();

    try {
      await provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
      return true;
    } catch (switchError: any) {
      const { code: errorCode } = switchError;

      const isDeniedSwitch = errorCode === NetworkConstant.METAMASK_DENIED_REQUEST_CODE;
      if (isDeniedSwitch) return false;

      try {
        await provider.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${chainId.toString(16)}`,
              chainName: "Polygon Network",
              nativeCurrency: {
                name: "Matic",
                symbol: "MATIC",
                decimals: 18,
              },
              rpcUrls: [rpcUrl],
              blockExplorerUrls: networkUrl,
            },
          ],
        });
        return true;
      } catch (error) {
        EnvConstant.IS_DEV && console.error("Failed to setup the network:", error);
        return false;
      }
    }
  } else {
    EnvConstant.IS_DEV && console.error("Can't setup the BSC network");
    return false;
  }
};

/**
 * Get transaction hash info URL of current network
 *
 * @param {string} transactionHash - Transaction hash
 * @param {string} currentNetwork - Current blockchain network
 *
 * @return {string} A url of transaction hash in current network.
 *
 */
export const getTransactionUrl = (transactionHash?: string) => {
  if (!transactionHash) return "/";

  const { chain, networkUrl } = new Blockchain();

  switch (chain) {
    case NetworkConstant.CHAIN_SUPPORT.polygon:
      return `${networkUrl}/tx/${transactionHash}`;
    default:
      return "/";
  }
};
