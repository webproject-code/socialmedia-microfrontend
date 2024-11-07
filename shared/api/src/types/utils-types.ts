export enum FriendshipStatus {
  FRIENDS = 'FRIENDS',
  NOT_FRIENDS = 'NOT_FRIENDS',
  REQUEST_SENT = 'REQUEST_SENT',
  REQUEST_RECEIVED = 'REQUEST_RECEIVED',
}

export type Pagination = {
  totalCount: number;
  hasNextPage: boolean;
  nextCursor: string;
};

export type PaginatedResponse<TKey extends string, TData> = Record<
  TKey,
  TData
> & {
  pagination: Pagination;
};

export type QueryPagination = {
  query?: string;
  cursor?: string;
  take?: string;
};
