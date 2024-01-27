import { ContractInterface, ethers } from "ethers";
import { EnvConstant, NetworkConstant } from "const";
import {
  NFTMarketplaceBuild,
  CardBuild,
  BoxBuild,
  EmoteBuild,
  TowerSkinBuild,
  SemiNFTMarketplaceBuild,
  TokenBuild,
  StakingNFTBuild,
  MintCardBuild,
} from "./builds";

export const getPolygonSmartContractFromJsonFile = (
  contractAddress: string,
  jsonFile: ContractInterface,
) => {
  try {
    const provider = new ethers.providers.JsonRpcProvider(NetworkConstant.BASE_RPC_NODE_URL);
    const contract = new ethers.Contract(contractAddress, jsonFile, provider);

    return contract;
  } catch (error) {
    EnvConstant.IS_DEV && console.log(error);
    return {} as any;
  }
};

export const NftMarketplaceContractInstance = getPolygonSmartContractFromJsonFile(
  EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_NFT_CARD_MARKETPLACE as string,
  NFTMarketplaceBuild.abi,
);

export const SemiNftMarketplaceContractInstance = getPolygonSmartContractFromJsonFile(
  EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_NFT_CARD_MARKETPLACE as string,
  SemiNFTMarketplaceBuild.abi,
);

export const BoxContractInstance = getPolygonSmartContractFromJsonFile(
  EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_NFT_BOX as string,
  BoxBuild.abi,
);

export const CardContractInstance = getPolygonSmartContractFromJsonFile(
  EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_NFT_CARD as string,
  CardBuild.abi,
);

export const EmoteContractInstance = getPolygonSmartContractFromJsonFile(
  EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_NFT_EMOTE as string,
  EmoteBuild.abi,
);

export const TowerSkinContractInstance = getPolygonSmartContractFromJsonFile(
  EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_NFT_TOWER_SKIN as string,
  TowerSkinBuild.abi,
);

export const ToyTokenContractInstance = getPolygonSmartContractFromJsonFile(
  EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_TOY_TOKEN as string,
  TokenBuild.abi,
);

export const StakingNFTContractInstance = getPolygonSmartContractFromJsonFile(
  EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_STAKING_CARD,
  StakingNFTBuild.abi,
);

export const MintCardContractInstance = getPolygonSmartContractFromJsonFile(
  EnvConstant.POLYGON_CONTRACT_ADDRESS.ADDRESS_MINT_CARD,
  MintCardBuild.abi,
);

const polygonContractInstance = {
  ...NftMarketplaceContractInstance,
  ...SemiNftMarketplaceContractInstance,
  ...BoxContractInstance,
  ...CardContractInstance,
  ...EmoteContractInstance,
  ...TowerSkinContractInstance,
  ...ToyTokenContractInstance,
};

export default polygonContractInstance;
