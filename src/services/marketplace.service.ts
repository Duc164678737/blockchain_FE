import Api from "api";
import Blockchain from "blockchain";
import { ApiConstant, BlockchainMethodConstant, NetworkConstant } from "const";
import { NFTClass, PaginationClass } from "models";
import { ResponseDataList, TypeNftQuery } from "models/types";
import StringFormat from "string-format";
import { BlockchainUtils } from "utils";
import { convertDataToURLSearchParams } from "utils/common.utils";

export const getNftMarketPlace = (query: TypeNftQuery) => {
  const params = convertDataToURLSearchParams(query);

  return Api.get<ResponseDataList<NFTClass>>(ApiConstant.GET_MARKETPLACE_NFT_LIST, params);
};

export const getNftDetail = (id: string) =>
  Api.get(StringFormat(ApiConstant.GET_MARKETPLACE_NFT_DETAIL, { id: id }));

export const getNftDetailTransaction = (id: number, params: Partial<PaginationClass>) =>
  Api.get(StringFormat(ApiConstant.GET_MARKETPLACE_NFT_TRANSACTIONS, { id: id }), params);

export const postBuyNftDetail = (id: number, transactionHash: string) =>
  Api.post(StringFormat(ApiConstant.POST_BUY_MARKETPLACE_NFT_DETAIL, { id: id }), transactionHash);

export const postCancelNftDetail = (id: number, transactionHash: string) =>
  Api.post(StringFormat(ApiConstant.POST_CANCEL_SELL_NFT_DETAIL, { id: id }), { transactionHash });

export const createApproveToyTokenData = async (
  spenderAddress: string,
  walletAddress: string,
  marketplaceContractAddress: string,
) => {
  const { chain, call } = new Blockchain();

  switch (chain) {
    case NetworkConstant.CHAIN_SUPPORT.polygon: {
      const response = await call(
        BlockchainMethodConstant.approveToyToken,
        marketplaceContractAddress,
      );

      if (response.status === ApiConstant.STT_OK) {
        return {
          from: walletAddress,
          data: response.data,
          to: spenderAddress,
        };
      } else {
        return {};
      }
    }

    default:
      return {};
  }
};

export const createBuyNftData = async (
  saleId: number,
  walletAddress: string,
  tokenAddress: string,
) => {
  const { chain, call } = new Blockchain();

  switch (chain) {
    case NetworkConstant.CHAIN_SUPPORT.polygon: {
      const response = await call(BlockchainMethodConstant.buyNft, saleId);

      if (response.status === ApiConstant.STT_OK) {
        return {
          from: walletAddress,
          data: response.data,
          to: tokenAddress,
        };
      } else {
        return {};
      }
    }

    default:
      return {};
  }
};

export const getTokenAllowance = async (spenderAddress: string, walletAddress: string) => {
  const { chain, call } = new Blockchain();

  switch (chain) {
    case NetworkConstant.CHAIN_SUPPORT.polygon: {
      const response = await call(
        BlockchainMethodConstant.toyTokenAllowance,
        walletAddress,
        spenderAddress,
      );
      if (response.status === ApiConstant.STT_OK) {
        return BlockchainUtils.convertTokenBalance(response.data);
      } else {
        return null;
      }
    }
    default:
      return;
  }
};

export const getToyBalance = async (walletAddress: string) => {
  const { chain, call } = new Blockchain();

  switch (chain) {
    case NetworkConstant.CHAIN_SUPPORT.polygon: {
      const response = await call(BlockchainMethodConstant.toyBalance, walletAddress);
      if (response.status === ApiConstant.STT_OK) {
        return BlockchainUtils.convertTokenBalance(response.data);
      } else {
        return null;
      }
    }
    default:
      return;
  }
};
