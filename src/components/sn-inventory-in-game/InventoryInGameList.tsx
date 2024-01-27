import React, { useEffect, useMemo } from "react";
import { Box } from "@mui/material";
import { useStyles } from "../sn-marketplace/HeroCardList";
import { TypeNftComponent } from "models/types";
import { InventoryActions, InventorySelector } from "redux-store";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { convertReduxQueryFromUrlQuery, getObjectSearchParams } from "utils/query.utils";
import { NFTConstant } from "const";

const InventoryWalletList = ({ typeItemClass, pathname, NftComponent }: TypeNftComponent) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { pageData } = useSelector(InventorySelector.getNftInGameList, shallowEqual);
  const inventoryQuery = useSelector(InventorySelector.getQueryInventory, shallowEqual);

  useEffect(() => {
    const searchObj = getObjectSearchParams();
    if (searchObj && Object.keys(searchObj).length) {
      const reduxQuery = convertReduxQueryFromUrlQuery(inventoryQuery, searchObj);

      dispatch(InventoryActions.setQueryParams({ queryInventory: reduxQuery }));
    }
    return () => {
      dispatch(InventoryActions.inventoryReset());
    };
  }, []);

  const listData = useMemo(() => {
    switch (typeItemClass) {
      case NFTConstant.NFT_CLASS_TYPE.card:
        return pageData;
      case NFTConstant.NFT_CLASS_TYPE.box:
      case NFTConstant.NFT_CLASS_TYPE.emote:
      case NFTConstant.NFT_CLASS_TYPE.towerSkin:
        return MOCK_DATA;
      default:
        return pageData;
    }
  }, [pageData, typeItemClass]);

  useEffect(() => {
    dispatch(
      InventoryActions.getNftInGameInventory({
        filters: {
          ...inventoryQuery,
          itemClass: typeItemClass,
        },
      }),
    );
  }, [inventoryQuery]);

  return (
    <Box className={classes.container}>
      {listData.map((item, index) => {
        return (
          <NftComponent
            key={index}
            data={item}
            isMarket={false}
            pathname={pathname}
            id={item.item.gameItemId}
          />
        );
      })}
    </Box>
  );
};

export default InventoryWalletList;

// Mock Data for the screen Box, Emote , TowerSkin
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
