export enum NFT_TYPE {
  troop = "troop",
  building = "building",
  spell = "spell",
}

export enum RARITY_TYPE {
  common = "common",
  rare = "rare",
  epic = "epic",
  legendary = "legendary",
}

export enum NFT_CLASS_TYPE {
  card = "card",
  box = "box",
  emote = "emote",
  towerSkin = "tower_skin",
}

export enum NFT_BOX_PERCENT {
  common = 0.835,
  rare = 0.12,
  epic = 0.03,
  legendary = 0.01,
}

export enum NFT_STATUS {
  pending = "pending",
  selling = "selling",
  selled = "selled",
  cancelled = "cancelled",
}

export const NFT_SORT_KEY = {
  date: "sale.createdAt",
  price: "sale.price",
};
