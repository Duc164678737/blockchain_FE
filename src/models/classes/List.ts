import Pagination from "./Pagination";

class List {
  pagination: Pagination;
  pageData: Array<unknown>;

  constructor(pagination?: Pagination, pageData?: Array<unknown>) {
    this.pageData = Array.isArray(pageData) ? pageData : [];
    this.pagination = pagination || new Pagination();
  }
}

export default List;
