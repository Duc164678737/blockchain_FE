import { FormatUtils } from "utils";
import { NFTConstant } from "const";
import { JsonClass } from "models/types";

class NFT {
  id: number;
  price: number;
  quantity: number;
  readonly sellerAddress: string;
  readonly buyerAddress: string;
  // TODO: update when have api docx
  status: string;
  item: INftDetail;
  saleId: number;
  avgPrice: number;
  highestPrice: number;

  constructor(data: JsonClass<NFT>) {
    this.id = data.id as number;
    this.price = data.price as number;
    this.quantity = data.quantity as number;
    this.sellerAddress = data.sellerAddress as string;
    this.buyerAddress = data.buyerAddress as string;
    this.status = data.status as string;
    this.item = data.item as INftDetail;
    this.saleId = data.saleId as number;
    this.avgPrice = data.avgPrice as number;
    this.highestPrice = data.highestPrice as number;
  }

  public get formatPrice() {
    return FormatUtils.formatNumber(this.price);
  }

  public get displayName() {
    return this.item?.displayName || "";
  }

  public get description() {
    return this.item?.description || "";
  }

  public get itemStats() {
    return this.item?.itemStats || [];
  }

  public get rareType() {
    return this.item?.rareType || "";
  }

  public get itemType() {
    return this.item?.itemType || "";
  }

  public get quantityNft() {
    return this.item?.quantity || "";
  }

  public get itemDetail() {
    return this.item || {};
  }

  public get iconUrl() {
    return this.item?.iconUrl || "";
  }

  public get tokenId() {
    return this.item?.tokenId || "";
  }

  public get itemClass(): NFTConstant.NFT_CLASS_TYPE | undefined {
    return this.item?.itemClass;
  }

  getDisplaySellerAddress() {
    return FormatUtils.truncateHash(this.sellerAddress);
  }

  getDisplayBuyerAddress() {
    return FormatUtils.truncateHash(this.buyerAddress);
  }

  getTotalUsdt() {
    // TODO: call api to get market price
    const MOCK_EXCHANGE_USDT = 0.835;
    return MOCK_EXCHANGE_USDT * this.price * this.quantity;
  }

  getTotalWithToken() {
    return FormatUtils.formatPriceWithToken(this.price * this.quantity);
  }

  getPriceWithToken() {
    return FormatUtils.formatPriceWithToken(this.price);
  }

  getAveragePriceWithToken() {
    return FormatUtils.formatPriceWithToken(this.avgPrice) || FormatUtils.formatPriceWithToken(0);
  }

  getHighestPriceWithToken() {
    return (
      FormatUtils.formatPriceWithToken(this.highestPrice) || FormatUtils.formatPriceWithToken(0)
    );
  }
}

export default NFT;

export interface INftDetail {
  id: number;
  tokenId: number;
  gameItemId: string;
  itemClass: NFTConstant.NFT_CLASS_TYPE;
  rareType: NFTConstant.RARITY_TYPE;
  itemType: NFTConstant.NFT_TYPE;
  displayName: string;
  iconUrl: string;
  level: number;
  description: string;
  itemStats: Array<INftStats>;
  quantity: number;
}

export interface INftStats {
  StatName: string;
  IconUrl: string;
  Value: string;
}
