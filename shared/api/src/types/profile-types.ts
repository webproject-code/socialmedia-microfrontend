import { User } from '.';
import { FriendshipStatus } from './utils-types';

export type UserProfile = Omit<User, 'accessToken' | 'expiresIn'> & {
  friendIds: string[];
  friendOfIds: string[];
  memberOfGroupIds: string[];
};

export type EditUser = {
  id: string;
  name?: string;
  bio?: string;
  profilePicture?: File | undefined;
};

export type FriendshipStatusResponse = {
  id: string;
  status: FriendshipStatus;
};

export interface IProfileService {
  fetchProfile: () => Promise<UserProfile>;
  updateProfile: (profileData: EditUser) => Promise<UserProfile>;
  fetchUser: (userId: string) => Promise<UserProfile>;
  fetchFriendshipStatus: (
    userId: string,
    friendId: string
  ) => Promise<FriendshipStatusResponse>;
}
