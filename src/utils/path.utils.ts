import { NFTConstant, PathConstant } from "const";

export const getMarketplaceDetail = (type: NFTConstant.NFT_CLASS_TYPE) => {
  switch (type) {
    case NFTConstant.NFT_CLASS_TYPE.box:
      return PathConstant.MARKETPLACE_BOX_DETAIL;

    case NFTConstant.NFT_CLASS_TYPE.card:
      return PathConstant.MARKETPLACE_CARD_DETAIL;

    case NFTConstant.NFT_CLASS_TYPE.emote:
      return PathConstant.MARKETPLACE_EMOTE_DETAIL;

    case NFTConstant.NFT_CLASS_TYPE.towerSkin:
      return PathConstant.MARKETPLACE_TOWER_SKIN_DETAIL;

    default:
      break;
  }
};
