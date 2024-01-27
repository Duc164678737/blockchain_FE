// Common
export const HEADER_DEFAULT = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const FRONT_END_API_URL = "/api/";

export const TIMEOUT = 30000;

// HTTP Status
export const STT_OK = 200;
export const STT_CREATED = 201;
export const STT_BAD_REQUEST = 400;
export const STT_UNAUTHORIZED = 401;
export const STT_FORBIDDEN = 403;
export const STT_NOT_FOUND = 404;
export const STT_INTERNAL_SERVER = 500;
export const STT_NOT_MODIFIED = 304;

// API
export const POST_LOGIN = "/login";
export const GET_PROFILE = "/profile";

export const GET_NONCE = "/auth/nonce";
export const LOGIN_WALLET = "/auth/access_token";

export const GET_MARKETPLACE_NFT_LIST = "/market";
export const GET_MARKETPLACE_NFT_DETAIL = GET_MARKETPLACE_NFT_LIST + "/{id}";
export const GET_MARKETPLACE_NFT_TRANSACTIONS = GET_MARKETPLACE_NFT_DETAIL + "/transactions";
export const POST_BUY_MARKETPLACE_NFT_DETAIL = "/market/{id}/bought";
export const POST_CANCEL_SELL_NFT_DETAIL = "/market/{id}/cancelled";

export const GET_INVENTORY_NFT_LIST = "/inventory/{ownerAddress}";
export const GET_INVENTORY_NFT_DETAIL = GET_INVENTORY_NFT_LIST + "/{itemClass}/{tokenId}";
export const GET_INVENTORY_NFT_TRANSACTIONS = GET_INVENTORY_NFT_DETAIL + "/transactions";
export const POST_SELL_NFT_DETAIL = "/market/{itemClass}";
export const POST_STAKE_NFT = GET_INVENTORY_NFT_LIST + "/{itemClass}/{tokenId}/stake_orders";

export const GET_INVENTORY_IN_GAME_NFT_LIST = "/game/inventory";
export const GET_INVENTORY_IN_GAME_NFT_DETAIL =
  GET_INVENTORY_IN_GAME_NFT_LIST + "/{itemClass}/{gameItemId}";
export const POST_UNSTAKE_NFT_DETAIL = GET_INVENTORY_IN_GAME_NFT_DETAIL + "/unstake_orders";
