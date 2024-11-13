import { IoPersonRemoveSharp } from 'react-icons/io5';

import { Button } from '@social-media/evoke-ui';

import { useCancelFriendRequest } from '@social-media/api';

interface CancelFriendRequestButtonProps {
  userId: string;
  friendId: string;
  friendRequestId: string;
  onCancel: () => void;
}

const CancelFriendRequestButton: React.FC<CancelFriendRequestButtonProps> = ({
  userId,
  friendId,
  friendRequestId,
  onCancel,
}) => {
  const { mutate: cancelFriendRequest } = useCancelFriendRequest(
    userId,
    friendId,
    friendRequestId
  );

  const handleCancelFriendRequest = () => {
    cancelFriendRequest();
    onCancel();
  };

  return (
    <Button
      className="w-fit p-2 sm:w-40 text-nowrap focus-ring outline-none"
      onClick={handleCancelFriendRequest}
      variant="outline"
      aria-label="Cancel friend request"
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === 'Enter') handleCancelFriendRequest();
      }}
    >
      <IoPersonRemoveSharp className="sm:hidden" size={20} />
      <p className="hidden sm:block">Cancel Request</p>
    </Button>
  );
};

export default CancelFriendRequestButton;
