import List from "./List";
import NFT from "./Nft";
import Pagination from "./Pagination";

class NftList extends List {
  pageData: Array<NFT>;

  constructor(pagination?: Pagination, pageData?: Array<NFT>) {
    super(pagination, pageData);
    // override type
    this.pageData = pageData || [];
  }
}

export default NftList;
