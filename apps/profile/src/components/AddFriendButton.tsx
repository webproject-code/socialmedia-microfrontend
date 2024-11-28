import { useSendFriendRequest } from '@social-media/api';
import { Button } from '@social-media/evoke-ui';

type AddFriendButtonProps = {
  userId: string;
  friendId: string;
};

const AddFriendButton: React.FC<AddFriendButtonProps> = ({
  userId,
  friendId,
}) => {
  const { mutate: sendFriendRequest, isPending } = useSendFriendRequest(
    userId,
    friendId
  );
  return (
    <Button
      className="sm:w-[200px] dark:text-dark-primary"
      onClick={() => sendFriendRequest()}
      disabled={isPending}
      tabIndex={0}
    >
      Add Friend
    </Button>
  );
};

export default AddFriendButton;
