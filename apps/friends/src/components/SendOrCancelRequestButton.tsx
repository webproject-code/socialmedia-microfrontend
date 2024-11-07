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

  return (
    <Button
      className="w-fit dark:text-dark-primary px-2"
      onClick={() => {
        if (friendshipStatus.status === FriendshipStatus.REQUEST_SENT)
          cancelFriendRequest();
        else sendFriendRequest();
      }}
      disabled={disabled}
    >
      {friendshipStatus &&
      friendshipStatus.status === FriendshipStatus.REQUEST_SENT ? (
        <>
          <IoPersonRemoveSharp className="sm:hidden" size={25} />
          <span className="hidden sm:block">Requested</span>
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
