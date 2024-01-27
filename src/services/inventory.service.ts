import Api, { createApi } from "api";
import Blockchain from "blockchain";
import {
  ApiConstant,
  BlockchainMethodConstant,
  EnvConstant,
  NFTConstant,
  NetworkConstant,
} from "const";
import { ethers } from "ethers";
import { PaginationClass } from "models";
import { StringOrNumber, TypeNftQuery } from "models/types";
import StringFormat from "string-format";
import { convertDataToURLSearchParams } from "utils/common.utils";

export const getNftInventory = (query: TypeNftQuery, ownerAddress: string) => {
  const params = convertDataToURLSearchParams(query);

  return Api.get(StringFormat(ApiConstant.GET_INVENTORY_NFT_LIST, { ownerAddress }), params);
};

export const postSellNftDetail = (itemClass: string, transactionHash: string) =>
  Api.post(StringFormat(ApiConstant.POST_SELL_NFT_DETAIL, { itemClass }), { transactionHash });

export const postStakeNft = (itemClass: string, tokenId: number, quantity: number) =>
  createApi().post(StringFormat(ApiConstant.POST_STAKE_NFT, { itemClass, tokenId }), { quantity });

export const getNftDetail = (
  ownerAddress: string,
  itemClass: NFTConstant.NFT_CLASS_TYPE,
  tokenId: number,
) =>
  Api.get(StringFormat(ApiConstant.GET_INVENTORY_NFT_DETAIL, { ownerAddress, itemClass, tokenId }));

export interface IInventoryNftApi {
  ownerAddress: string;
  itemClass: NFTConstant.NFT_CLASS_TYPE;
  tokenId: number;
}
export const getNftDetailTransaction = (
  data: IInventoryNftApi,
  params: Partial<PaginationClass>,
) => {
  const { ownerAddress, itemClass, tokenId } = data;
  const url = StringFormat(ApiConstant.GET_INVENTORY_NFT_TRANSACTIONS, {
    ownerAddress,
    itemClass,
    tokenId,
  });

  return Api.get(url, params);
};

export const getNftInGameInventory = (query: TypeNftQuery) => {
  const params = convertDataToURLSearchParams(query);

  return createApi().get(StringFormat(ApiConstant.GET_INVENTORY_IN_GAME_NFT_LIST), params);
};

export const getNftDetailInGameInventory = (
  itemClass: NFTConstant.NFT_CLASS_TYPE,
  gameItemId: string,
) => {
  return createApi().get(
    StringFormat(ApiConstant.GET_INVENTORY_IN_GAME_NFT_DETAIL, { itemClass, gameItemId }),
  );
};

export const createUnstakeOrder = (
  itemClass: NFTConstant.NFT_CLASS_TYPE,
  gameItemId: string,
  quantity: number,
) => {
  return createApi().post(
    StringFormat(ApiConstant.POST_UNSTAKE_NFT_DETAIL, { itemClass, gameItemId }),
    { quantity },
  );
};

export const polygonApproveSellCard = async (
  inventoryContractAddress: string,
  spenderContractAddress: string,
  walletAddress: string,
) => {
  if (!inventoryContractAddress || !spenderContractAddress || !walletAddress) {
    return;
  }

  const { call } = new Blockchain();

  try {
    const response = await call(
      BlockchainMethodConstant.setCardApprovalForAll,
      spenderContractAddress,
      true,
    );
    if (response.status === ApiConstant.STT_OK) {
      return {
        from: walletAddress,
        data: response.data,
        to: inventoryContractAddress,
      };
    } else {
      return {};
    }
  } catch (error) {
    window.isDebug && console.log(error);
    return {};
  }
};

export const createApproveInventoryTransactionData = async (
  inventoryContractAddress: string,
  spenderContractAddress: string,
  walletAddress: string,
) => {
  const { chain } = new Blockchain();

  switch (chain) {
    case NetworkConstant.CHAIN_SUPPORT.polygon:
      return polygonApproveSellCard(
        inventoryContractAddress,
        spenderContractAddress,
        walletAddress,
      );
    default:
      return {};
  }
};

export const checkIsNftApproveForAll = async (
  spenderContractAddress: string,
  walletAddress: string,
) => {
  if (!spenderContractAddress || !walletAddress) {
    return false;
  }

  const { chain, call } = new Blockchain();

  switch (chain) {
    case NetworkConstant.CHAIN_SUPPORT.polygon: {
      const isApprove = await call(
        BlockchainMethodConstant.isApprovedForAllCard,
        walletAddress,
        spenderContractAddress,
      );
      if (isApprove.status === ApiConstant.STT_OK) {
        return isApprove.data;
      } else {
        return false;
      }
    }

    default:
      return false;
  }
};

export const polygonListingCardTransaction = async (
  nftId: StringOrNumber,
  totalPrice: string,
  walletAddress: string,
) => {
  if (!nftId || !totalPrice || !walletAddress) {
    return;
  }
  const { call } = new Blockchain();
  const parseTotalPriceBigNumber = ethers.utils.parseEther(totalPrice);

  try {
    const response = await call(
      BlockchainMethodConstant.listingNft,
      nftId,
      parseTotalPriceBigNumber,
    );
    if (response && response.status === ApiConstant.STT_OK) {
      return {
        from: walletAddress,
        data: response.data,
        to: EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_NFT_CARD_MARKETPLACE,
      };
    } else {
      return {};
    }
  } catch (error) {
    window.isDebug && console.log(error);
    return {};
  }
};

export const createListingCardTransactionData = async (
  nftId: StringOrNumber,
  totalPrice: string,
  walletAddress: string,
) => {
  const { chain } = new Blockchain();

  switch (chain) {
    case NetworkConstant.CHAIN_SUPPORT.polygon: {
      return polygonListingCardTransaction(nftId, totalPrice, walletAddress);
    }
    default:
      return;
  }
};

export const createCancelListingNft = async (saleId: number, walletAddress: string) => {
  const { chain, call } = new Blockchain();

  switch (chain) {
    case NetworkConstant.CHAIN_SUPPORT.polygon: {
      const response = await call(BlockchainMethodConstant.cancelListingNft, saleId);

      if (response.status === ApiConstant.STT_OK) {
        return {
          from: walletAddress,
          data: response.data,
          to: EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_NFT_CARD_MARKETPLACE,
        };
      } else {
        return {};
      }
    }

    default:
      return {};
  }
};

export const createStakingCardTransaction = async (
  orderId: number,
  nftId: number,
  signature: string,
  walletAddress: string,
) => {
  const { chain, call } = new Blockchain();

  switch (chain) {
    case NetworkConstant.CHAIN_SUPPORT.polygon: {
      const response = await call(
        BlockchainMethodConstant.stakingNFTCard,
        orderId,
        nftId,
        signature,
      );
      if (response.status === ApiConstant.STT_OK) {
        return {
          from: walletAddress,
          data: response.data,
          to: EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_STAKING_CARD,
        };
      } else {
        return {};
      }
    }
    default:
      return {};
  }
};

export const createUnStakeCardTransaction = async (
  walletAddress: string,
  orderId: string,
  metadataId: string,
  nftId: number,
  signature: string,
) => {
  const { chain, call } = new Blockchain();

  switch (chain) {
    case NetworkConstant.CHAIN_SUPPORT.polygon: {
      const response = await call(
        BlockchainMethodConstant.unStakeCardNft,
        orderId,
        metadataId,
        nftId,
        signature,
      );

      if (response.status === ApiConstant.STT_OK) {
        return {
          from: walletAddress,
          data: response.data,
          to: EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_STAKING_CARD,
        };
      } else {
        return {};
      }
    }
    default:
      return {};
  }
};

export const createMintCardTransaction = async (
  walletAddress: string,
  rarity: string,
  cardType: string,
  metadataId: string,
  externalOrderId: string,
  signature: string,
) => {
  const { chain, call } = new Blockchain();

  switch (chain) {
    case NetworkConstant.CHAIN_SUPPORT.polygon: {
      const response = await call(
        BlockchainMethodConstant.mintNftByUser,
        rarity,
        cardType,
        metadataId,
        Number(externalOrderId),
        signature,
      );
      if (response.status === ApiConstant.STT_OK) {
        return {
          from: walletAddress,
          data: response.data,
          to: EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_MINT_CARD,
        };
      } else {
        return {};
      }
    }
    default:
      return {};
  }
};
