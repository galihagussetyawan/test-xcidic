export type PaginateResponse<T> = {
  items: T[];
  totalItem: number;
  totalPage: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
};
