import { ApiConstant } from "const";
import { AccountService } from "services";

const useHandleConnectWalletFunc = () => {
  const loginWallet = async (walletAddress: string, signature: string) => {
    try {
      const response = await AccountService.loginWallet(walletAddress, signature);

      if (response.status === ApiConstant.STT_OK) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const responseData: any = response.data;
        return responseData.data;
      }
      return {};
    } catch {
      return {};
    }
  };

  const handleGetNonce = async (walletAddress: string) => {
    try {
      const response = await AccountService.handleGetNonce(walletAddress);

      if (response.status === ApiConstant.STT_OK) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const responseData: any = response.data;
        return responseData.data.nonce;
      }
      return "";
    } catch {
      return "";
    }
  };

  return { loginWallet, handleGetNonce };
};

export default useHandleConnectWalletFunc;
