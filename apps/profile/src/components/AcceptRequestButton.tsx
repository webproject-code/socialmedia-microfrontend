import { useAcceptOrRejectFriendRequest } from '@social-media/api';
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
  const { mutate: updateFriendRequest } = useAcceptOrRejectFriendRequest(
    userId,
    friendId,
    friendRequestId
  );
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} spacing="small">
      <Button
        className="dark:text-dark-primary"
        onClick={() => updateFriendRequest('ACCEPTED')}
      >
        Approve
      </Button>
      <Button
        className="dark:text-dark-secondary"
        onClick={() => updateFriendRequest('REJECTED')}
        variant="outline"
      >
        Delete
      </Button>
    </Stack>
  );
};

export default AcceptRequestButton;
