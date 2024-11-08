import { FaCheck } from 'react-icons/fa';

import { Button } from '@social-media/evoke-ui';

import { useAcceptOrRejectFriendRequest } from '@social-media/api';

interface AcceptFriendRequestButtonProps {
  userId: string;
  friendId: string;
  friendRequestId: string;
}

const AcceptFriendRequestButton: React.FC<AcceptFriendRequestButtonProps> = ({
  userId,
  friendId,
  friendRequestId,
}) => {
  const { mutate: acceptOrRejectFriendRequest } =
    useAcceptOrRejectFriendRequest(userId, friendId, friendRequestId);

  return (
    <Button
      className="p-1.5 sm:px-4 sm:py-2"
      onClick={() => acceptOrRejectFriendRequest('ACCEPTED')}
    >
      <FaCheck className="w-4 h-4" />
      <p className="hidden sm:block">Accept</p>
    </Button>
  );
};

export default AcceptFriendRequestButton;
