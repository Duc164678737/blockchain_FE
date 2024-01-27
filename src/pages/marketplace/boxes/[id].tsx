import { BoxCard, InfoDetailBox } from "components/common";
import { BoxDetailCard, MarketplaceDetail } from "components/sn-marketplace";
import { NFTConstant } from "const";
import { NextPageWithLayout } from "pages/_app";

const EmoteDetail: NextPageWithLayout = () => {
  return (
    <MarketplaceDetail
      nftType={NFTConstant.NFT_CLASS_TYPE.box}
      CardDetailComponent={BoxDetailCard}
      InfoDetailComponent={InfoDetailBox}
      NftComponent={BoxCard}
    />
  );
};

export default EmoteDetail;
