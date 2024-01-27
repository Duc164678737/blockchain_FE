import { ApiResponse } from "apisauce";
import { ApiConstant, NFTConstant } from "const";
import { ResponseData } from "models/types";
import { InventoryService } from "services";

export const createUnstakeOrder = async (
  nftType: NFTConstant.NFT_CLASS_TYPE,
  orderId: string,
  quantity: number,
) => {
  const response = (await InventoryService.createUnstakeOrder(
    nftType,
    orderId,
    quantity,
  )) as ApiResponse<ResponseData<TypeUnstakeOder>>;

  if (response.status === ApiConstant.STT_CREATED) {
    const responseData = response.data;
    if (!responseData) return {} as TypeUnstakeOder;

    return responseData.data;
  } else {
    return {} as TypeUnstakeOder;
  }
};

interface TypeUnstakeOder {
  id: string;
  item: {
    tokenId: number;
    gameItemId: string;
    itemClass: string;
    itemType: string;
  };
  quantity: number;
  gameSignature: string;
  status: string;
  orderType: string;
  transactionHash: string;
  cancelSignature: string;
  cancelReason: string;
}
