import Blockchain from "blockchain";
import { getTxResult, sendTransaction } from "./transaction";
import polygonContractInstance, {
  BoxContractInstance,
  CardContractInstance,
  EmoteContractInstance,
  NftMarketplaceContractInstance,
  SemiNftMarketplaceContractInstance,
  ToyTokenContractInstance,
  TowerSkinContractInstance,
  StakingNFTContractInstance,
  MintCardContractInstance,
} from "./smart-contract-instance";
import { ethers } from "ethers";
import { BlockchainMethodConstant } from "const";

const polygonTransaction = {
  send: (walletAddress: string, transactionData: any) =>
    sendTransaction(walletAddress, transactionData),
  getResult: (transactionHash: string) => getTxResult(transactionHash, new Blockchain().rpcUrl),
};

const polygonMethods: any = {
  ...polygonContractInstance,

  setBoxApprovalForAll: (address: string, bool: boolean) =>
    BoxContractInstance.interface.encodeFunctionData("setApprovalForAll", [address, bool]),
  setCardApprovalForAll: (address: string, bool: boolean) =>
    CardContractInstance.interface.encodeFunctionData("setApprovalForAll", [address, bool]),
  setEmoteApprovalForAll: (address: string, bool: boolean) =>
    EmoteContractInstance.interface.encodeFunctionData("setApprovalForAll", [address, bool]),
  setTowerSkinApprovalForAll: (address: string, bool: boolean) =>
    TowerSkinContractInstance.interface.encodeFunctionData("setApprovalForAll", [address, bool]),

  isApprovedForAllCard: CardContractInstance.isApprovedForAll,

  listingSemiNft: (nftId: number, price: number) =>
    SemiNftMarketplaceContractInstance.interface.encodeFunctionData("listing", [nftId, price]),

  listingNft: (nftId: number, price: number) =>
    NftMarketplaceContractInstance.interface.encodeFunctionData("listing", [nftId, price]),

  // Buy Card
  [BlockchainMethodConstant.approveToyToken]: (spenderAddress: string) =>
    ToyTokenContractInstance.interface.encodeFunctionData("approve", [
      spenderAddress,
      ethers.constants.MaxUint256,
    ]),
  [BlockchainMethodConstant.buyNft]: (nftId: number) =>
    NftMarketplaceContractInstance.interface.encodeFunctionData("buy", [nftId]),
  toyTokenAllowance: ToyTokenContractInstance.allowance,
  toyBalance: ToyTokenContractInstance.balanceOf,

  cancelListingNft: (saleId: number) =>
    NftMarketplaceContractInstance.interface.encodeFunctionData("cancelListing", [saleId]),

  stakingNFTCard: (orderId: number, nftId: number, signature: string) =>
    StakingNFTContractInstance.interface.encodeFunctionData("stake", [orderId, nftId, signature]),
  
  unStakeCardNft: (orderId: number, metadataId: string, nftId: number, signature: string) =>
    StakingNFTContractInstance.interface.encodeFunctionData("unstake", [
      orderId,
      metadataId,
      nftId,
      signature,
    ]),

  mintNftByUser: (
    rarity: string,
    cardType: string,
    metadataId: string,
    externalOrderId: number,
    signature: string,
  ) =>
    MintCardContractInstance.interface.encodeFunctionData("mintByUser", [
      rarity,
      cardType,
      metadataId,
      externalOrderId,
      signature,
    ]),
};

export { polygonTransaction, polygonMethods };
