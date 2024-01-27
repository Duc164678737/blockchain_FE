import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from "react";
import { ethers } from "ethers";
import { ConnectorUtils } from "utils";
import { AppConstant, WalletConstant, NetworkConstant, LangConstant, PathConstant } from "const";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from "@web3-react/walletconnect-connector";
import Cookie from "js-cookie";
import Blockchain from "blockchain";
import { useHandleConnectWalletFunc } from "./hooks";
import { MODAL_TYPES, useGlobalModalContext } from "./GlobalModalContext";
import { useTranslation } from "react-i18next";
import { AppTrans, AppTypography } from "components/common";
import { checkIsCancelSignMessage } from "./helper";
import { useRouter } from "next/router";

const INITIAL_STATE = {} as AuthContextProps;
let signRequest = 0;

const AuthContext = createContext(INITIAL_STATE);
export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: AuthProvider) => {
  const { library, activate, deactivate } = useWeb3React();

  const { showGlobalModal, closeGlobalModal } = useGlobalModalContext();
  const { handleGetNonce, loginWallet } = useHandleConnectWalletFunc();

  const { t: getLabel } = useTranslation();
  const { t: getErrorLabel } = useTranslation(LangConstant.NS_ERROR);

  const router = useRouter();

  const [walletAddress, setWalletAddress] = useState("");
  const [isWalletConnecting, setIsWalletConnecting] = useState(false);
  const [isChoosingAccounts, setIsChoosingAccounts] = useState(false);
  const [isSwitchingAccount, setIsSwitchingAccount] = useState(false);
  const [isOpenConnectDrawer, setIsOpenConnectDrawer] = useState(false);

  const hasSignature = Cookie.get(AppConstant.KEY_SIGNATURE);
  const accessToken = Cookie.get(AppConstant.KEY_TOKEN);
  const connectorId = ConnectorUtils.getCurrentConnectorId();

  const isWalletConnected = useMemo(() => {
    return Boolean(walletAddress && hasSignature);
  }, [walletAddress, hasSignature]);

  const hasAccessToken = useMemo(() => {
    return Boolean(walletAddress && accessToken);
  }, [walletAddress, accessToken]);

  const isReconnectingWallet = useMemo(() => {
    return Boolean(!walletAddress && hasSignature);
  }, [walletAddress, hasSignature]);

  const walletAddressRef = useRef(walletAddress);
  const isWalletConnectedRef = useRef(isWalletConnected);

  const handleToggleDrawer = () => {
    setIsOpenConnectDrawer(!isOpenConnectDrawer);
  };

  const handleConnectPolygon = async (connectorMethod: any) => {
    try {
      setIsWalletConnecting(true);
      const currentProvider = await ConnectorUtils.getCurrentProvider();
      const currentConnectedId = ConnectorUtils.getCurrentConnectorId();

      if (currentConnectedId === NetworkConstant.CONNECTOR_IDS.metamask) {
        const ethersProvider = new ethers.providers.Web3Provider(currentProvider, "any");
        const accounts = await ethersProvider.listAccounts();

        if (accounts?.length === 0) {
          setIsChoosingAccounts(true);
        }
      }

      await activate(connectorMethod, undefined, true);

      const account = ConnectorUtils.getCurrentBscAddress(currentProvider);
      setIsChoosingAccounts(false);
      return account;
    } catch (error: any) {
      if (error instanceof UnsupportedChainIdError) {
        setIsWalletConnecting(true);
        const currentProvider = await ConnectorUtils.getCurrentProvider();

        const hasSetup = await ConnectorUtils.setupPolygonNetwork(currentProvider);

        if (hasSetup) {
          await activate(connectorMethod);
          const account = ConnectorUtils.getCurrentBscAddress(currentProvider);
          return account;
        } else {
          const connectorId = localStorage.getItem(WalletConstant.CONNECTOR_ID_KEY) || "";
          showGlobalModal(MODAL_TYPES.confirmModal, {
            modalTitleProps: { title: getErrorLabel("lUnsupportedNetwork") },
            modalContentProps: { content: getErrorLabel("msgUnsupportedNetwork") },
            confirmButtonProps: { labelConfirm: getLabel("lSwitch") },
            onCancel: closeGlobalModal,
            onConfirm: () => {
              closeGlobalModal();
              handleLogin(connectorId);
            },
          });
          handleLogout();
          setIsWalletConnecting(false);
          setIsChoosingAccounts(false);
          setIsOpenConnectDrawer(false);
          return "";
        }
      } else {
        handleLogout();
        setIsWalletConnecting(false);
        setIsChoosingAccounts(false);
        setIsOpenConnectDrawer(false);

        if (
          error instanceof NoEthereumProviderError ||
          error?.message?.includes("missing provider")
        ) {
          showGlobalModal(MODAL_TYPES.noticeModal, {
            modalTitleProps: { title: getErrorLabel("lNoWalletFound") },
            modalContentProps: {
              content: (
                <>
                  <AppTypography textTransform="capitalize">
                    {getErrorLabel("msgNoExtension")}
                  </AppTypography>
                  <br />
                  <AppTrans
                    textProps={{ color: "common.white", fontWeight: 500 }}
                    i18nKey={getErrorLabel("fmGoToGoogle")}
                  />
                </>
              ),
            },
            onSubmit: closeGlobalModal,
          });
        } else if (
          error instanceof UserRejectedRequestErrorInjected ||
          error instanceof UserRejectedRequestErrorWalletConnect
        ) {
          showGlobalModal(MODAL_TYPES.noticeModal, {
            modalTitleProps: { title: getErrorLabel("lError") },
            modalContentProps: { content: getErrorLabel("msgWentWrong") },
            onSubmit: closeGlobalModal,
          });
          if (ConnectorUtils.walletConnectConnector instanceof WalletConnectConnector) {
            ConnectorUtils.walletConnectConnector.walletConnectProvider = null;
          }
        } else {
          showGlobalModal(MODAL_TYPES.noticeModal, {
            modalTitleProps: { title: getErrorLabel("lError") },
            modalContentProps: { content: getErrorLabel("msgWentWrong") },
            onSubmit: closeGlobalModal,
          });
        }
      }
      return;
    }
  };

  const handleSignMessage = async (account: string) => {
    signRequest += 1;
    if (signRequest > 1) {
      return;
    }

    setIsWalletConnecting(true);
    const currentWalletProvider = await ConnectorUtils.getCurrentProvider();

    try {
      const ethersProvider = new ethers.providers.Web3Provider(currentWalletProvider, "any");
      const nonce = await handleGetNonce(account);
      if (!nonce) return;

      const walletSignature = await ethersProvider.getSigner(account).signMessage(nonce.toString());

      if (walletSignature) {
        Cookie.set(AppConstant.KEY_SIGNATURE, walletSignature);
        signRequest = 0;
        const responseData = await loginWallet(account, walletSignature);
        setIsWalletConnecting(false);
        setIsSwitchingAccount(false);
        setIsOpenConnectDrawer(false);

        if (!responseData) return;

        if (responseData.accessToken) {
          Cookie.set(AppConstant.KEY_TOKEN, responseData.accessToken);
        }
        return;
      }

      handleLogout();
    } catch (error: unknown) {
      signRequest = 0;
      const isCancelSignMsg = checkIsCancelSignMessage(error);
      if (isCancelSignMsg) {
        const connectorId = localStorage.getItem(WalletConstant.CONNECTOR_ID_KEY) || "";

        showGlobalModal(MODAL_TYPES.confirmModal, {
          modalTitleProps: { title: getErrorLabel("lUnsignedMessage") },
          modalContentProps: { content: getErrorLabel("msgUnsignedMessage") },
          confirmButtonProps: { labelConfirm: getLabel("lTryAgain") },
          onConfirm: () => {
            handleLogin(connectorId);
            closeGlobalModal();
          },
          onCancel: closeGlobalModal,
        });
      } else {
        showGlobalModal(MODAL_TYPES.noticeModal, {
          modalTitleProps: { title: getErrorLabel("lError") },
          modalContentProps: { content: getErrorLabel("msgWentWrong") },
          onSubmit: closeGlobalModal,
        });
      }
      handleLogout();
      setIsWalletConnecting(false);
      setIsSwitchingAccount(false);
      setIsOpenConnectDrawer(false);
    }
  };

  const handleLogin = useCallback(
    async (connectorId: string, isSwitchAccount?: boolean) => {
      localStorage.setItem(WalletConstant.CONNECTOR_ID_KEY, connectorId);
      let account;

      const injectedConnector = ConnectorUtils.injectedConnector();
      const walletConnectConnector = ConnectorUtils.walletConnectConnector;

      switch (connectorId) {
        case NetworkConstant.CONNECTOR_IDS.metamask:
          account = await handleConnectPolygon(injectedConnector);
          break;
        case NetworkConstant.CONNECTOR_IDS.walletConnect:
          account = await handleConnectPolygon(walletConnectConnector);
          break;
      }

      if (!account) return;
      setWalletAddress(account);

      if (isReconnectingWallet && !isSwitchAccount) return;

      if (isSwitchAccount) {
        setIsSwitchingAccount(true);
      }

      handleSignMessage(account);
    },
    [handleConnectPolygon, handleSignMessage, setWalletAddress],
  );

  const handleLogout = useCallback(async () => {
    deactivate();

    setWalletAddress("");
    setIsWalletConnecting(false);
    ConnectorUtils.clearWalletConnectConnector();
    localStorage.removeItem(WalletConstant.CONNECTOR_ID_KEY);

    Cookie.remove(AppConstant.KEY_SIGNATURE);
    Cookie.remove(AppConstant.KEY_TOKEN);

    router.push(PathConstant.ROOT);
  }, []);

  const handlePolygonChainChanged = (_chainId: any) => {
    const { chainId } = new Blockchain();
    const chainIdHex = `0x${chainId.toString(16)}`;
    if ((_chainId !== chainId || _chainId != chainIdHex) && isWalletConnectedRef.current) {
      const connectorId = localStorage.getItem(WalletConstant.CONNECTOR_ID_KEY) || "";

      showGlobalModal(MODAL_TYPES.confirmModal, {
        modalTitleProps: { title: getErrorLabel("lUnsupportedNetwork") },
        modalContentProps: { content: getErrorLabel("msgUnsupportedNetwork") },
        confirmButtonProps: { labelConfirm: getLabel("lSwitch") },
        onCancel: closeGlobalModal,
        onConfirm: () => {
          handleLogin(connectorId);
          closeGlobalModal();
        },
      });
      handleLogout();
    }
  };

  const handleAccountChanged = async (accounts: Array<string>) => {
    if (accounts.length === 0) {
      handleLogout();
      return;
    }

    const newChecksumAddress = ethers.utils.getAddress(accounts[0]);

    if (!isWalletConnectedRef.current || newChecksumAddress === walletAddressRef.current) return;

    setIsSwitchingAccount(true);

    await handleLogout();

    handleLogin(connectorId, true);
  };

  // Handle user switch to unsupported network and switch account
  // TODO: Might update logic catch event chain changed when implement other chain
  useEffect(() => {
    if (!library) return;

    const isWalletConnect =
      localStorage.getItem(WalletConstant.CONNECTOR_ID_KEY) ===
      NetworkConstant.CONNECTOR_IDS.walletConnect;

    const currentProvider = ConnectorUtils.getCurrentProvider();

    const currentWalletProvider = isWalletConnect ? library?._provider : currentProvider;

    currentWalletProvider?.on?.("chainChanged", handlePolygonChainChanged);
    currentWalletProvider?.on?.("accountsChanged", handleAccountChanged);

    // Clear event only for wallet connect
    return () => {
      currentWalletProvider?.off?.("chainChanged", handlePolygonChainChanged);
      currentWalletProvider?.off?.("accountsChanged", handleAccountChanged);
    };
  }, [library, connectorId]);

  // Reconnect wallet when reload page
  useEffect(() => {
    if (!walletAddress && connectorId && hasSignature) {
      handleLogin(connectorId);
    }
  }, [walletAddress, connectorId, hasSignature, handleLogin]);

  useEffect(() => {
    isWalletConnectedRef.current = isWalletConnected;
  }, [isWalletConnected]);

  useEffect(() => {
    walletAddressRef.current = walletAddress;
  }, [walletAddress]);

  return (
    <AuthContext.Provider
      value={{
        handleLogin: handleLogin,
        handleLogout: handleLogout,
        walletAddress: walletAddress,
        isWalletConnected: isWalletConnected,
        hasAccessToken: hasAccessToken,
        handleToggleDrawer: handleToggleDrawer,
        isSwitchingAccount: isSwitchingAccount,
        isChoosingAccounts: isChoosingAccounts,
        isWalletConnecting: isWalletConnecting,
        isOpenConnectDrawer: isOpenConnectDrawer,
        isReconnectingWallet: isReconnectingWallet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

type AuthProvider = {
  children: React.ReactNode;
};

type AuthContextProps = {
  walletAddress: string;
  handleLogout: () => void;
  isWalletConnected: boolean;
  hasAccessToken: boolean;
  isWalletConnecting: boolean;
  isSwitchingAccount: boolean;
  isChoosingAccounts: boolean;
  isOpenConnectDrawer: boolean;
  isReconnectingWallet: boolean;
  handleToggleDrawer: () => void;
  handleLogin: (connectorId: string, isSwitchAccount?: boolean) => void;
};
