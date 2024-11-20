import { FriendshipStatus, useFriendshipStatus } from '@social-media/api';
import { Skeleton, Stack } from '@social-media/evoke-ui';
import AddFriendButton from './AddFriendButton';
import CancelFriendButton from './CancelFriendButton';
import AcceptRequestButton from './AcceptRequestButton';
import RemoveFriendButton from './RemoveFriendButton';

type FriendStatusButtonProps = {
  userId: string;
  friendId: string;
};

const LoadingState: React.FC = () => {
  return (
    <Stack spacing="small">
      <Skeleton
        variant="rectangular"
        height="36px"
        className="w-full sm:w-[200px]"
      />
      <Skeleton
        variant="rectangular"
        height="36px"
        className="w-full sm:w-[200px]"
      />
    </Stack>
  );
};

const FriendStatusButton: React.FC<FriendStatusButtonProps> = ({
  userId,
  friendId,
}) => {
  // Fetch the friendship status
  const { data: friendshipStatus, isPending } = useFriendshipStatus(
    userId,
    friendId
  );

  if (isPending || !friendshipStatus) return <LoadingState />;

  const { status, friendRequestId } = friendshipStatus;

  // Map each status to the corresponding button component
  const StatusButtonMap: Record<FriendshipStatus, JSX.Element> = {
    FRIENDS: <RemoveFriendButton userId={userId} friendId={friendId} />,
    NOT_FRIENDS: <AddFriendButton userId={userId} friendId={friendId} />,
    REQUEST_SENT: (
      <CancelFriendButton
        userId={userId}
        friendId={friendId}
        friendRequestId={friendRequestId}
      />
    ),
    REQUEST_RECEIVED: (
      <AcceptRequestButton
        userId={userId}
        friendId={friendId}
        friendRequestId={friendRequestId}
      />
    ),
  };

  return StatusButtonMap[status as FriendshipStatus];
};

export default FriendStatusButton;
