import { useCancelFriendRequest } from '@social-media/api';
import { Button } from '@social-media/evoke-ui';

type CancelFriendButtonProps = {
  userId: string;
  friendId: string;
  friendRequestId: string;
};

const CancelFriendButton: React.FC<CancelFriendButtonProps> = ({
  userId,
  friendId,
  friendRequestId,
}) => {
  const { mutate: cancelFriendRequest } = useCancelFriendRequest(
    userId,
    friendId,
    friendRequestId
  );
  return (
    <Button
      className="w-fit dark:text-dark-primary"
      onClick={() => cancelFriendRequest()}
    >
      Cancel Request
    </Button>
  );
};

export default CancelFriendButton;
