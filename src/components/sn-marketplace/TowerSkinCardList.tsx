import React from "react";
import { Box } from "@mui/material";
import { PathConstant } from "const";
import { TowerSkinCard } from "../common/card";
import { useStyles } from "./BoxCardList";
import { useAuthContext } from "context";

const TowerSkinCardList = () => {
  const classes = useStyles();
  const { walletAddress } = useAuthContext();

  return (
    <Box className={classes.container}>
      {MOCK_DATA.map((item: any, index) => {
        const isSellerAddress = item.sellerAddress === walletAddress.toLowerCase();
        return (
          <TowerSkinCard
            data={item}
            key={index}
            pathname={PathConstant.MARKETPLACE_TOWER_SKIN_DETAIL}
            id={String(item.id)}
            isSellerAddress={isSellerAddress}
          />
        );
      })}
    </Box>
  );
};

export default TowerSkinCardList;

const MOCK_DATA = [
  {
    quantity: 1,
    id: 162,
    item: {
      createdAt: "2023-03-22T15:52:58.066Z",
      description: "",
      displayName: "Valkyrie",
      gameItemId: "97A1C24863EDF8B",
      iconUrl: "https://dev-tzu-game-icon.s3.ap-southeast-1.amazonaws.com/icon/Card/Valkyrie.png",
      id: 17,
      itemClass: "card",
      itemType: "troop",
      level: 3,
      mana: 3,
      ownerAddress: "0x606046238457d690022abf0d1439050ca138155c",
      quantity: 1,
      rareType: "rare",
      tokenId: 17,
      updatedAt: "2023-04-20T02:15:12.152Z",
      userUuid: "b0e81865-7e2f-4274-b847-b6778cb28105",
    },
    price: 1,
    tokenId: 1,
  },
  {
    quantity: 2,
    id: 166,
    item: {
      createdAt: "2023-03-22T15:52:58.066Z",
      description: "",
      displayName: "Valkyrie",
      gameItemId: "97A1C24863EDF8B",
      iconUrl: "https://dev-tzu-game-icon.s3.ap-southeast-1.amazonaws.com/icon/Card/Valkyrie.png",
      id: 18,
      itemClass: "card",
      itemType: "troop",
      level: 3,
      mana: 3,
      ownerAddress: "0x606046238457d690022abf0d1439050ca138155c",
      quantity: 1,
      rareType: "rare",
      tokenId: 17,
      updatedAt: "2023-04-20T02:15:12.152Z",
      userUuid: "b0e81865-7e2f-4274-b847-b6778cb28105",
    },
    price: 2,
    tokenId: 2,
  },
  {
    quantity: 3,
    id: 176,
    item: {
      createdAt: "2023-03-22T15:52:58.066Z",
      description: "",
      displayName: "Valkyrie",
      gameItemId: "97A1C24863EDF8B",
      iconUrl: "https://dev-tzu-game-icon.s3.ap-southeast-1.amazonaws.com/icon/Card/Valkyrie.png",
      id: 19,
      itemClass: "card",
      itemType: "troop",
      level: 3,
      mana: 3,
      ownerAddress: "0x606046238457d690022abf0d1439050ca138155c",
      quantity: 1,
      rareType: "rare",
      tokenId: 17,
      updatedAt: "2023-04-20T02:15:12.152Z",
      userUuid: "b0e81865-7e2f-4274-b847-b6778cb28105",
    },
    price: 3,
    tokenId: 3,
  },
  {
    quantity: 4,
    id: 170,
    item: {
      createdAt: "2023-03-22T15:52:58.066Z",
      description: "",
      displayName: "Valkyrie",
      gameItemId: "97A1C24863EDF8B",
      iconUrl: "https://dev-tzu-game-icon.s3.ap-southeast-1.amazonaws.com/icon/Card/Valkyrie.png",
      id: 16,
      itemClass: "card",
      itemType: "troop",
      level: 3,
      mana: 3,
      ownerAddress: "0x606046238457d690022abf0d1439050ca138155c",
      quantity: 1,
      rareType: "rare",
      tokenId: 17,
      updatedAt: "2023-04-20T02:15:12.152Z",
      userUuid: "b0e81865-7e2f-4274-b847-b6778cb28105",
    },
    price: 4,
    tokenId: 4,
  },
];
