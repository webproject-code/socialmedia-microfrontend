import { FaCheck } from 'react-icons/fa';

import { Button } from '@social-media/evoke-ui';

import { useAcceptFriendRequest } from '@social-media/api';

interface AcceptFriendRequestButtonProps {
  userId: string;
  friendId: string;
  friendRequestId: string;
  name: string;
  onAccept: () => void;
}

const AcceptFriendRequestButton: React.FC<AcceptFriendRequestButtonProps> = ({
  userId,
  friendId,
  friendRequestId,
  name,
  onAccept,
}) => {
  const { mutate: acceptOrRejectFriendRequest } = useAcceptFriendRequest(
    userId,
    friendId,
    friendRequestId
  );

  const handleAccept = () => {
    acceptOrRejectFriendRequest();
    onAccept();
  };

  return (
    <Button
      aria-label={`Accept friend request from ${name}`}
      className="p-1.5 sm:px-4 sm:py-2  focus-visible:ring-2
      focus-visible:ring-light-secondary
      focus-visible:ring-offset-2
      dark:focus-visible:ring-dark-secondary
      dark:focus-visible:ring-offset-dark-primary
      outline-none"
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
