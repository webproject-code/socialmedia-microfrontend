import { RxCross2 } from 'react-icons/rx';

import { Button } from '@social-media/evoke-ui';

import { useRejectFriendRequest } from '@social-media/api';

interface RejectFriendRequestButtonProps {
  userId: string;
  friendId: string;
  friendRequestId: string;
  name: string;
  onReject: () => void;
}

const RejectFriendRequestButton: React.FC<RejectFriendRequestButtonProps> = ({
  userId,
  friendId,
  friendRequestId,
  name,
  onReject,
}) => {
  const { mutate: acceptOrRejectFriendRequest } = useRejectFriendRequest(
    userId,
    friendId,
    friendRequestId
  );

  const handleReject = () => {
    acceptOrRejectFriendRequest();
    onReject();
  };
  return (
    <Button
      variant="outline"
      aria-label={`Reject friend request from ${name}`}
      className="p-1 sm:px-4 sm:py-2 dark:text-dark-lavender focus-ring outline-none"
      onClick={handleReject}
      tabIndex={0}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === 'Enter') handleReject();
      }}
    >
      <RxCross2 className="w-4 h-4 sm:w-5 sm:h-5" />
      <p className="hidden sm:block">Reject</p>
    </Button>
  );
};

export default RejectFriendRequestButton;
