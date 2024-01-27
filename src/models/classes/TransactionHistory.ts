import { AppConstant } from "const";
import { getLabel, getLabelWithNS } from "language";
import { JsonClass } from "models/types";
import { DateUtils, FormatUtils } from "utils";

class TransactionHistory {
  createdAt: string;
  updatedAt: string;
  id: number;
  hash: string;
  blockNumber: number;
  blockTimestamp: number;
  from: string;
  to: string;
  tokenId: number;
  tokenAddress: string;
  amount: number;
  status: string;
  name: string;
  signature: string;
  price?: number;

  constructor(data: JsonClass<TransactionHistory>) {
    this.createdAt = String(data.createdAt);
    this.updatedAt = String(data.updatedAt);
    this.id = Number(data.id);
    this.hash = String(data.hash);
    this.blockNumber = Number(data.blockNumber);
    this.blockTimestamp = Number(data.blockTimestamp);
    this.from = String(data.from);
    this.to = String(data.to);
    this.tokenId = Number(data.tokenId);
    this.tokenAddress = String(data.tokenAddress);
    this.amount = Number(data.amount);
    this.status = String(data.status);
    this.name = String(data.name);
    this.signature = String(data.signature);
    if (data.price !== undefined) this.price = Number(data.price);
  }

  getBlockDate() {
    return DateUtils.covertTimeStampToDateFormat(
      this.blockTimestamp,
      true,
      AppConstant.FULL_DATE_FORMAT,
    );
  }

  getDisplayPrice() {
    return this.price ?? AppConstant.NOT_HAVE_VALUE_LABEL;
  }

  getDisplayActionType(namespace?: string) {
    const getLabelType = (key: string) =>
      namespace ? getLabelWithNS(namespace, key) : getLabel(key);

    switch (this.name) {
      case AppConstant.TYPE_TRANSACTION_HISTORY.buy:
        return getLabelType("lBuy");

      case AppConstant.TYPE_TRANSACTION_HISTORY.listing:
        return getLabelType("lListing");

      case AppConstant.TYPE_TRANSACTION_HISTORY.cancelSelling:
        return getLabelType("lCancelSelling");

      case AppConstant.TYPE_TRANSACTION_HISTORY.stacking:
        return getLabelType("lStaking");

      case AppConstant.TYPE_TRANSACTION_HISTORY.unStaking:
        return getLabelType("lUnstaking");

      case AppConstant.TYPE_TRANSACTION_HISTORY.cancelListing:
        return getLabelType("lCancelListing");
      default:
        "";
    }
  }

  getDisplayTxHash() {
    return FormatUtils.truncateHash(this.hash);
  }
  getDisplayWalletAddress() {
    return FormatUtils.truncateHash(this.from);
  }
}

export default TransactionHistory;
