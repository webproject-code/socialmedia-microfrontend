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
  const { mutate: cancelFriendRequest, isPending } = useCancelFriendRequest(
    userId,
    friendId,
    friendRequestId
  );
  return (
    <Button
      className="sm:w-[200px] dark:text-dark-primary"
      onClick={() => cancelFriendRequest()}
      disabled={isPending}
      tabIndex={0}
    >
      Cancel Request
    </Button>
  );
};

export default CancelFriendButton;
