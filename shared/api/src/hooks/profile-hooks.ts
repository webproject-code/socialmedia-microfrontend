import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchFriendshipStatus,
  fetchProfile,
  fetchUser,
  updateProfile,
} from '../services/profile-services';
import { EditUser, UserProfile } from '../types';

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });
};

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });
};

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

export const useFriendshipStatus = (userId: string, friendId: string) => {
  return useQuery({
    queryKey: ['friendshipStatus', userId, friendId],
    queryFn: () => fetchFriendshipStatus(userId, friendId),
  });
};
