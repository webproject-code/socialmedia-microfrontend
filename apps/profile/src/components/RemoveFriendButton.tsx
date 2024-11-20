import { createOneOnOneChat, useRemoveFriend } from '@social-media/api';
import { Button, Stack } from '@social-media/evoke-ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type RemoveFriendButtonProps = {
  userId: string;
  friendId: string;
};

const RemoveFriendButton: React.FC<RemoveFriendButtonProps> = ({
  userId,
  friendId,
}) => {
  const { mutate: removeFriend } = useRemoveFriend(userId, friendId);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const openChatWindow = () => {
    setIsLoading(true);
    createOneOnOneChat(userId, friendId).then((response) => {
      setIsLoading(false);
      if (response.id) {
        navigate(`/chats/one-on-one/${response.id}`);
      }
    });
  };
  return (
    <Stack spacing="small" className="w-full">
      <Button
        className="xs:w-full sm:w-[200px]"
        disabled={isLoading}
        onClick={openChatWindow}
      >
        Message
      </Button>
      <Button
        variant="destructive"
        className="xs:w-full sm:w-[200px]"
        onClick={() => removeFriend()}
      >
        Remove Friend
      </Button>
    </Stack>
  );
};

export default RemoveFriendButton;
