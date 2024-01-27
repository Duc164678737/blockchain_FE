export const KEY_TOKEN = "token";
export const KEY_SIGNATURE = "signature";
export const COOKIE_EXPIRED_DATE = 7;

export const NOT_HAVE_VALUE_LABEL = "- -";
export const NOT_AVAILABLE_VALUE = "N/A";

export const DEBOUNCE_TIME_IN_MILLISECOND = 500;

export const SIZE_PAGINATION_DEFAULT = 12;
export const DEFAULT_PAGINATION = {
  page: 1,
  size: SIZE_PAGINATION_DEFAULT,
};
export const SORT_DIRECTION = {
  asc: "ASC",
  desc: "DESC",
};

// Date, Time Format
export const DATE_FORMAT = "dd/MM/yy";
export const FULL_DATE_FORMAT = "dd/MM/yyyy";
export const TIME_FORMAT = "HH:mm";

export const TRANSACTION_STEP = {
  approveToken: "approveToken",
  approveInventory: "approveInventory",
  sendTransaction: "sendTransaction",
};

export const TRANSACTION_STATUS = {
  // Approve token
  approvingToken: "approvingToken",
  approveTokenSuccess: "approveTokenSuccess",
  approveTokenFailed: "approveTokenFailed",

  // Approve Inventory
  approvingInventory: "approvingInventory",
  approveInventorySuccess: "approveInventorySuccess",
  approveInventoryFailed: "approveInventoryFailed",

  // Transaction
  transactionProcessing: "transactionProcessing",
  transactionSuccess: "transactionSuccess",
  transactionFailed: "transactionFailed",

  // Cancel
  transactionCancelled: "transactionCancelled",
};

export enum TRANSACTION_STATUS_TYPE {
  complete = "complete",
  failed = "failed",
  loading = "loading",
  cancel = "cancel",
}

export enum SNACKBAR_STATUS {
  success = 1,
  error,
}
export const LABEL_TOKEN = "TOYS";
export const USD = "USD";

export const enum HEADER_ROUND_INO_STATUS {
  expireIn = "expireIn",
  startIn = "startIn",
  end = "end",
  soldOut = "soldOut",
}

export const enum TYPE_TRANSACTION_HISTORY {
  buy = "buy",
  listing = "listing",
  cancelSelling = "cancelSelling",
  stacking = "staking",
  unStaking = "unStaking",
  cancelListing = "cancelListing",
}

export enum BUY_NFT_STEP {
  APPROVE = 1,
  BUY_NFT,
}

export const enum TYPE_ERROR_TRANSACTION_NFT {
  actionRejected = "ACTION_REJECTED",
}

export const enum ORDER_STATUS {
  PENDING = "pending",
  SUCCESS = "success",
  CANCELLED = "cancelled",
}
