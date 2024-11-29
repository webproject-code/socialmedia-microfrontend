import { useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSocket } from '../context/SocketContext';

export const useFriendSocket = () => {
  const queryClient = useQueryClient();
  const { socket } = useSocket();

  const updateFriends = useCallback(
    ({ senderId, receiverId }: { senderId: string; receiverId: string }) => {
      queryClient.invalidateQueries({
        queryKey: ['friends', senderId],
      });
      queryClient.invalidateQueries({
        queryKey: ['friends', receiverId],
      });
    },
    [queryClient]
  );

  useEffect(() => {
    socket?.on('updateFriendList', updateFriends);
    return () => {
      socket?.off('updateFriendList');
    };
  }, [socket, updateFriends]);
};

export const useFriendRequestsSocket = () => {
  const queryClient = useQueryClient();
  const { socket } = useSocket();

  const updateFriendRequests = useCallback(
    ({ receiverId }: { receiverId: string }) => {
      queryClient.invalidateQueries({
        queryKey: ['friendRequests', receiverId],
      });
    },
    [queryClient]
  );

  useEffect(() => {
    socket?.on('updateFriendRequestList', updateFriendRequests);
    return () => {
      socket?.off('updateFriendRequestList');
    };
  }, [socket, updateFriendRequests]);
};
