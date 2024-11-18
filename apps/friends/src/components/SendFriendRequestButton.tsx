import { IoPersonAdd } from 'react-icons/io5';

import { Button } from '@social-media/evoke-ui';

import { useSendFriendRequest } from '@social-media/api';

interface SendFriendRequestButtonProps {
  userId: string;
  friendId: string;
  onSend: (requestId: string) => void;
}

const SendFriendRequestButton: React.FC<SendFriendRequestButtonProps> = ({
  userId,
  friendId,
  onSend,
}) => {
  const { mutate: sendFriendRequest } = useSendFriendRequest(userId, friendId);

  const handleSendFriendRequest = () => {
    sendFriendRequest(undefined, {
      onSuccess: (data) => {
        onSend(data.friendRequest.id);
      },
    });
  };

  return (
    <Button
      className="w-fit p-2 sm:w-40 text-nowrap dark:text-dark-primary focus-ring outline-none"
      onClick={handleSendFriendRequest}
      aria-label="Send friend request"
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === 'Enter') handleSendFriendRequest();
      }}
    >
      <IoPersonAdd className="sm:hidden" size={20} />
      <p className="hidden sm:block">Add Friend</p>
    </Button>
  );
};

export default SendFriendRequestButton;
