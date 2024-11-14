import { useRemoveFriend } from '@social-media/api';
import { Button } from '@social-media/evoke-ui';

type RemoveFriendButtonProps = {
  userId: string;
  friendId: string;
};

const RemoveFriendButton: React.FC<RemoveFriendButtonProps> = ({
  userId,
  friendId,
}) => {
  const { mutate: removeFriend } = useRemoveFriend(userId, friendId);
  return (
    <Button className="xs:w-full sm:w-fit" onClick={() => removeFriend()}>
      Remove Friend
    </Button>
  );
};

export default RemoveFriendButton;
