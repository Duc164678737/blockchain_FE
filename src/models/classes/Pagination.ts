import { AppConstant } from "const";
import { JsonClass } from "models/types";

class Pagination {
  pageNum: number;
  size: number;
  totalItems: number;
  totalPages: number;

  constructor(data: JsonClass<Pagination> = DEFAULT_PAGINATION) {
    this.pageNum = Number(data.pageNum);
    this.size = Number(data.size || DEFAULT_PAGINATION.size);
    this.totalItems = Number(data.totalItems) || 0;
    this.totalPages = Number(data.totalPages) || 1;
  }

  static createFromResponse(data: IPaginationBackend, size = DEFAULT_PAGINATION.size) {
    const totalItems = data.total ?? DEFAULT_PAGINATION.totalItems;
    const totalPages = size !== 0 ? Math.ceil(totalItems / size) : DEFAULT_PAGINATION.totalPages;
    return new Pagination({
      totalItems,
      size,
      totalPages,
      pageNum: data.pageNum,
    });
  }
}

export default Pagination;

interface IPaginationBackend {
  pageNum: number;
  total: number;
}

const DEFAULT_PAGINATION = {
  pageNum: 1,
  size: AppConstant.SIZE_PAGINATION_DEFAULT,
  totalItems: 0,
  totalPages: 1,
};
