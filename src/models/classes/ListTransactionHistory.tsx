import List from "./List";
import Pagination from "./Pagination";
import TransactionHistory from "./TransactionHistory";

class ListTransactionHistory extends List {
  pageData: Array<TransactionHistory>;

  constructor(pagination?: Pagination, pageData?: Array<TransactionHistory>) {
    super(pagination, pageData);
    // override type
    this.pageData = pageData || [];
  }
}

export default ListTransactionHistory;
