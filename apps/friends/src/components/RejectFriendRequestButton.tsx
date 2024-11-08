import { RxCross2 } from 'react-icons/rx';

import { Button } from '@social-media/evoke-ui';

import { useAcceptOrRejectFriendRequest } from '@social-media/api';

interface RejectFriendRequestButtonProps {
  userId: string;
  friendId: string;
  friendRequestId: string;
  onReject: () => void;
}

const RejectFriendRequestButton: React.FC<RejectFriendRequestButtonProps> = ({
  userId,
  friendId,
  friendRequestId,
  onReject,
}) => {
  const { mutate: acceptOrRejectFriendRequest } =
    useAcceptOrRejectFriendRequest(userId, friendId, friendRequestId);

  const handleReject = () => {
    acceptOrRejectFriendRequest('REJECTED');
    onReject();
  };
  return (
    <Button
      variant="outline"
      className="p-1 sm:px-4 sm:py-2"
      onClick={handleReject}
    >
      <RxCross2 className="w-4 h-4 sm:w-5 sm:h-5" />
      <p className="hidden sm:block">Reject</p>
    </Button>
  );
};

export default RejectFriendRequestButton;
