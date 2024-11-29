import { createOneOnOneChat, useRemoveFriend } from '@social-media/api';
import { Button, Modal, Stack, useModal } from '@social-media/evoke-ui';
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
  const { mutate: removeFriend, isPending } = useRemoveFriend(userId, friendId);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [show, toggleModal] = useModal();

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
        onClick={toggleModal}
      >
        Remove Friend
      </Button>
      <Modal
        size="sm"
        show={show}
        onClose={toggleModal}
        showCloseButton={true}
        closeOnOverlayClick={true}
        bodyClassName="bg-light-modalColor dark:bg-dark-modalColor dark:text-white"
      >
        <Modal.Header>
          <h3 className="text-xl font-bold text-light-secondary dark:text-dark-secondary">
            Remove Friend ?
          </h3>
        </Modal.Header>
        <Modal.Content>
          <p>Are you sure want to remove friend ?</p>
        </Modal.Content>
        <Modal.Footer>
          <Stack spacing="small" justify="end">
            <Button variant="outline" onClick={toggleModal}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={() => removeFriend()}
            >
              Remove
            </Button>
          </Stack>
        </Modal.Footer>
      </Modal>
    </Stack>
  );
};

export default RemoveFriendButton;
