import { HeroCard, InfoDetailCard } from "components/common";
import { HeroCardDetail, MarketplaceDetail } from "components/sn-marketplace";
import { NFTConstant } from "const";
import { NextPageWithLayout } from "pages/_app";

const CardDetail: NextPageWithLayout = () => {
  return (
    <MarketplaceDetail
      nftType={NFTConstant.NFT_CLASS_TYPE.card}
      CardDetailComponent={HeroCardDetail}
      InfoDetailComponent={InfoDetailCard}
      NftComponent={HeroCard}
    />
  );
};

export default CardDetail;
