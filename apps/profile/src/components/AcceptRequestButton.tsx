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
  const { mutate: acceptFriendRequest } = useAcceptFriendRequest(
    userId,
    friendId,
    friendRequestId
  );
  const { mutate: rejectFriendRequest } = useRejectFriendRequest(
    userId,
    friendId,
    friendRequestId
  );
  return (
    <Stack direction="row" spacing="small" className="w-full">
      <Button
        className="dark:text-dark-primary sm:w-[200px]"
        onClick={() => acceptFriendRequest('ACCEPTED')}
      >
        Accept
      </Button>
      <Button
        className="dark:text-dark-secondary sm:w-[200px]"
        onClick={() => rejectFriendRequest('REJECTED')}
        variant="outline"
      >
        Reject
      </Button>
    </Stack>
  );
};

export default AcceptRequestButton;
