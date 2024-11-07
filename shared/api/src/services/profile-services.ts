import apiClient from '../axios/axios-instance';
import {
  FriendshipStatusResponse,
  IProfileService,
  UserProfile,
} from '../types';

// Fetch logged in user's profile
export const fetchProfile: IProfileService['fetchProfile'] = async () => {
  const { data } = await apiClient.get<UserProfile>('/users/me');
  return data;
};

// Fetch a particular user's details
export const fetchUser: IProfileService['fetchUser'] = async (
  userId: string
) => {
  const { data } = await apiClient.get<UserProfile>(`/users/${userId}`);
  return data;
};

// Update profile
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

// Fetch friendship status
export const fetchFriendshipStatus: IProfileService['fetchFriendshipStatus'] =
  async (userId: string, friendId: string) => {
    const { data } = await apiClient.get<FriendshipStatusResponse>(
      `/users/${userId}/friendship-status/${friendId}`
    );
    return data;
  };
