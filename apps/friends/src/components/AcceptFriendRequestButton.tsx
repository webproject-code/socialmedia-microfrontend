import { FaCheck } from 'react-icons/fa';

import { Button } from '@social-media/evoke-ui';

import { useAcceptFriendRequest } from '@social-media/api';

interface AcceptFriendRequestButtonProps {
  userId: string;
  friendId: string;
  incomingRequestId: string;
  name: string;
  onAccept: () => void;
}

const AcceptFriendRequestButton: React.FC<AcceptFriendRequestButtonProps> = ({
  userId,
  friendId,
  incomingRequestId,
  name,
  onAccept,
}) => {
  const { mutate: acceptOrRejectFriendRequest } = useAcceptFriendRequest(
    userId,
    friendId,
    incomingRequestId
  );

  const handleAccept = () => {
    acceptOrRejectFriendRequest();
    onAccept();
  };

  return (
    <Button
      aria-label={`Accept friend request from ${name}`}
      className="p-1.5 sm:px-3 focus-ring"
      tabIndex={0}
      onClick={handleAccept}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.stopPropagation();
          handleAccept();
        }
      }}
    >
      <FaCheck className="w-4 h-4" />
      <p className="hidden sm:block">Accept</p>
    </Button>
  );
};

export default AcceptFriendRequestButton;
