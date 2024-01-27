import { TowerSkinCard } from "components/common";
import { InfoDetailTowerSkin } from "components/common/tower-skin";
import { MarketplaceDetail, TowerSkinCardDetail } from "components/sn-marketplace";
import { NFTConstant } from "const";
import { NextPageWithLayout } from "pages/_app";

const TowerSkinDetail: NextPageWithLayout = () => {
  return (
    <MarketplaceDetail
      nftType={NFTConstant.NFT_CLASS_TYPE.towerSkin}
      CardDetailComponent={TowerSkinCardDetail}
      InfoDetailComponent={InfoDetailTowerSkin}
      NftComponent={TowerSkinCard}
    />
  );
};

export default TowerSkinDetail;
