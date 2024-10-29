export enum FriendshipStatus {
  FRIENDS = 'friends',
  NOT_FRIENDS = 'not_friends',
  REQUEST_SENT = 'friend_request_sent',
  REQUEST_RECEIVED = 'friend_request_received',
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
