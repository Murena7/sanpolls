export interface IPollsTablePagination {
  take: number;
  skip: number;
  id?: string;
  disableLoader: boolean;
  appendData: boolean;
}
