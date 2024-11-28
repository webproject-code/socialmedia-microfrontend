import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchFriendshipStatus,
  fetchProfile,
  fetchUser,
  updateProfile,
} from '../services/profile-services';
import { EditUser, UserProfile } from '../types';
import { useFriendStatusSocket } from './profile-socket-hooks';

// Fetch profile details of logged in user
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });
};

// Fetch a particular user's details
export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });
};

// Update profile
export const useProfileUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (profileData: EditUser) => updateProfile(profileData),
    onSuccess: (data: UserProfile) => {
      queryClient.setQueryData(['profile'], data);
      queryClient.setQueryData(['user', data.id], data);
    },
  });
};

// Fetch friendship status
export const useFriendshipStatus = (userId: string, friendId: string) => {
  // add socket listeners
  useFriendStatusSocket();
  return useQuery({
    queryKey: ['friendshipStatus', userId, friendId],
    queryFn: () => fetchFriendshipStatus(userId, friendId),
  });
};
