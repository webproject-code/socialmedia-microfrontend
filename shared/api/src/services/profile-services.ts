import apiClient from '../axios/axios-instance';
import {
  FriendshipStatusResponse,
  IProfileService,
  UserProfile,
} from '../types';

// fetch logged in user profile
export const fetchProfile: IProfileService['fetchProfile'] = async () => {
  const { data } = await apiClient.get<UserProfile>('/users/me');
  return data;
};

// fetch single user
export const fetchUser: IProfileService['fetchUser'] = async (
  userId: string
) => {
  const { data } = await apiClient.get<UserProfile>(`/users/${userId}`);
  return data;
};

// update profile
export const updateProfile: IProfileService['updateProfile'] = async (
  profileData
) => {
  const { id, name, bio, profilePicture } = profileData;

  const formData = new FormData();
  name && formData.append('name', name);
  bio && formData.append('bio', bio);
  profilePicture && formData.append('profilePicture', profilePicture);

  const { data } = await apiClient.put<UserProfile>(`/users/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// fetch friendship status
export const fetchFriendshipStatus: IProfileService['fetchFriendshipStatus'] =
  async (userId: string, friendId: string) => {
    const { data } = await apiClient.get<FriendshipStatusResponse>(
      `/users/${userId}/friendship-status/${friendId}`
    );
    return data;
  };
