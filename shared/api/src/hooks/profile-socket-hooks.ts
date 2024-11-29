import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';

export const useFriendStatusSocket = () => {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const updateFriendShipStatus = useCallback(
    ({ senderId, receiverId }: { senderId: string; receiverId: string }) => {
      queryClient.invalidateQueries({
        queryKey: ['friendshipStatus', receiverId, senderId],
      });
    },
    [queryClient]
  );

  useEffect(() => {
    socket?.on('updateFriendRequestStatus', updateFriendShipStatus);
    return () => {
      socket?.off('updateFriendRequestStatus');
    };
  }, [socket, updateFriendShipStatus]);
};
