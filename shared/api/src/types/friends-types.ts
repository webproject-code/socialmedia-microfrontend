import { User } from '.';
import { PaginatedResponse, QueryPagination } from './utils-types';

export type Friend = Pick<User, 'id' | 'name' | 'email' | 'profilePicture'>;

export type FriendRequest = {
  id: string;
  senderId: string;
  receiverId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
  updatedAt: string;
};

export type FriendRequests = FriendRequest &
  {
    status: 'PENDING';
    sender: Friend;
  }[];

export interface IFriendsService {
  fetchFriends: (
    userId: string,
    params?: QueryPagination
  ) => Promise<PaginatedResponse<'friends', Friend[]>>;
  fetchFriendRequests: (
    userId: string,
    params?: QueryPagination
  ) => Promise<PaginatedResponse<'friendRequests', FriendRequests>>;
  fetchSuggestedFriends: (
    userId: string,
    params?: QueryPagination
  ) => Promise<PaginatedResponse<'suggestedFriends', Friend[]>>;
  fetchMutualFriends: (
    userId: string,
    friendId: string,
    params?: QueryPagination
  ) => Promise<PaginatedResponse<'mutualFriends', Friend[]>>;
  removeFriend: (
    userId: string,
    friendId: string,
    params?: QueryPagination
  ) => Promise<string>;
  sendFriendRequest: (
    userId: string,
    friendId: string
  ) => Promise<{ friendRequest: FriendRequest }>;
  acceptOrRejectFriendRequest: (
    friendId: string,
    status: 'ACCEPTED' | 'REJECTED'
  ) => Promise<string>;
  cancleFriendRequest: (friendId: string) => Promise<string>;
}
