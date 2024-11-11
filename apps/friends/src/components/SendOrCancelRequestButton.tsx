import { IoPersonAdd, IoPersonRemoveSharp } from 'react-icons/io5';

import { Button } from '@social-media/evoke-ui';

import { FriendshipStatus, FriendshipStatusResponse } from '@social-media/api';
import {
  useCancelFriendRequest,
  useSendFriendRequest,
} from '@social-media/api';

interface SendOrCancelRequestButtonProps {
  userId: string;
  friendId: string;
  friendshipStatus: FriendshipStatusResponse;
  disabled: boolean;
}

const SendOrCancelRequestButton: React.FC<SendOrCancelRequestButtonProps> = ({
  userId,
  friendId,
  friendshipStatus,
  disabled,
}) => {
  const { mutate: sendFriendRequest } = useSendFriendRequest(userId, friendId);
  const { mutate: cancelFriendRequest } = useCancelFriendRequest(
    userId,
    friendId,
    friendshipStatus.friendRequestId
  );

  const handleAction = () => {
    if (friendshipStatus.status === FriendshipStatus.REQUEST_SENT)
      cancelFriendRequest();
    else sendFriendRequest();
  };

  return (
    <Button
      className="w-fit dark:text-dark-primary px-2  focus-visible:ring-2
      focus-visible:ring-light-primary
      focus-visible:ring-offset-2
      dark:focus-visible:ring-dark-primary
      dark:focus-visible:ring-offset-light-secondary
      outline-none"
      onClick={handleAction}
      disabled={disabled}
      aria-label={
        friendshipStatus.status === FriendshipStatus.REQUEST_SENT
          ? 'Cancel friend request'
          : 'Send friend request'
      }
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === 'Enter') handleAction();
      }}
    >
      {friendshipStatus &&
      friendshipStatus.status === FriendshipStatus.REQUEST_SENT ? (
        <>
          <IoPersonRemoveSharp className="sm:hidden" size={25} />
          <span className="hidden sm:block">Cancel Request</span>
        </>
      ) : (
        <>
          <IoPersonAdd className="sm:hidden" size={25} />
          <span className="hidden sm:block">Add Friend</span>
        </>
      )}
    </Button>
  );
};

export default SendOrCancelRequestButton;
