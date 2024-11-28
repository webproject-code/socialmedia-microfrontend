import {
  useAcceptFriendRequest,
  useRejectFriendRequest,
} from '@social-media/api';
import { Button, Stack } from '@social-media/evoke-ui';

type AcceptRequestButtonProps = {
  userId: string;
  friendId: string;
  friendRequestId: string;
};

const AcceptRequestButton: React.FC<AcceptRequestButtonProps> = ({
  userId,
  friendId,
  friendRequestId,
}) => {
  const { mutate: acceptFriendRequest, isPending: isPendingForAccept } =
    useAcceptFriendRequest(userId, friendId, friendRequestId);
  const { mutate: rejectFriendRequest, isPending: isPendingForReject } =
    useRejectFriendRequest(userId, friendId, friendRequestId);
  return (
    <Stack direction="row" spacing="small" className="w-full">
      <Button
        className="dark:text-dark-primary sm:w-[200px]"
        onClick={() => acceptFriendRequest()}
        disabled={isPendingForAccept}
        tabIndex={0}
      >
        Accept
      </Button>
      <Button
        className="dark:text-dark-secondary sm:w-[200px]"
        onClick={() => rejectFriendRequest()}
        disabled={isPendingForReject}
        variant="outline"
        tabIndex={0}
      >
        Reject
      </Button>
    </Stack>
  );
};

export default AcceptRequestButton;
