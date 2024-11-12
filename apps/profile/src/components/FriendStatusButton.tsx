import { useFriendshipStatus } from '@social-media/api';
import { Skeleton } from '@social-media/evoke-ui';
import AddFriendButton from './AddFriendButton';
import CancelFriendButton from './CancelFriendButton';
import AcceptRequestButton from './AcceptRequestButton';
import RemoveFriendButton from './RemoveFriendButton';

type FriendStatusButtonProps = {
  userId: string;
  friendId: string;
};

const FriendStatusButton: React.FC<FriendStatusButtonProps> = ({
  userId,
  friendId,
}) => {
  const { data: friendshipStatus, isPending } = useFriendshipStatus(
    userId,
    friendId
  );

  if (isPending || !friendshipStatus)
    return <Skeleton variant="rectangular" width="100px" height="36px" />;

  const getButtonLabel = (status: string | undefined) => {
    switch (status) {
      case 'FRIENDS':
        return <RemoveFriendButton userId={userId} friendId={friendId} />;
      case 'NOT_FRIENDS':
        return <AddFriendButton userId={userId} friendId={friendId} />;
      case 'REQUEST_SENT':
        return (
          <CancelFriendButton
            userId={userId}
            friendId={friendId}
            friendRequestId={friendshipStatus.friendRequestId}
          />
        );
      case 'REQUEST_RECEIVED':
        return (
          <AcceptRequestButton
            userId={userId}
            friendId={friendId}
            friendRequestId={friendshipStatus.friendRequestId}
          />
        );
      default:
        return <AddFriendButton userId={userId} friendId={friendId} />;
    }
  };

  return getButtonLabel(friendshipStatus.status);
};

export default FriendStatusButton;
