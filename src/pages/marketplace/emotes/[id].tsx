import { EmoteCard } from "components/common";
import { InfoDetailEmote } from "components/common/emote";
import { EmoteCardDetail, MarketplaceDetail } from "components/sn-marketplace";
import { NFTConstant } from "const";
import { NextPageWithLayout } from "pages/_app";

const EmoteDetail: NextPageWithLayout = () => {
  return (
    <MarketplaceDetail
      nftType={NFTConstant.NFT_CLASS_TYPE.emote}
      CardDetailComponent={EmoteCardDetail}
      InfoDetailComponent={InfoDetailEmote}
      NftComponent={EmoteCard}
    />
  );
};

export default EmoteDetail;
