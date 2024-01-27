import { ApiResponse } from "apisauce";
import { ApiConstant, NFTConstant } from "const";
import { ResponseData } from "models/types";
import { InventoryService } from "services";

export const createStakeOder = async (
  nftType: NFTConstant.NFT_CLASS_TYPE,
  nftId: number,
  quantity: number,
) => {
  const response = (await InventoryService.postStakeNft(nftType, nftId, quantity)) as ApiResponse<
    ResponseData<IStakerOder>
  >;

  if (response.status === ApiConstant.STT_CREATED) {
    const responseData = response.data;
    if (!responseData) return {} as IStakerOder;

    return responseData.data;
  } else {
    return {} as IStakerOder;
  }
};

interface IStakerOder {
  id: number;
  quantity: number;
  gameSignature: string;
  status: string;
  orderType: string;
  transactionHash: string;
  cancelSignature: string;
  cancelReason: string;
  item: {
    tokenId: number;
    gameItemId: string;
    itemClass: string;
    rareType: string;
    itemType: string;
  };
}
