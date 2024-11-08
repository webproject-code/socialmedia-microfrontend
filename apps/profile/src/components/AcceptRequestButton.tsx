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
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing="small">
      <Button
        className="dark:text-dark-primary"
        onClick={() => acceptFriendRequest('ACCEPTED')}
      >
        Approve
      </Button>
      <Button
        className="dark:text-dark-secondary"
        onClick={() => rejectFriendRequest('REJECTED')}
        variant="outline"
      >
        Delete
      </Button>
    </Stack>
  );
};

export default AcceptRequestButton;
