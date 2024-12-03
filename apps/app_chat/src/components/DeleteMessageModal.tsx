import { useQueryClient } from '@tanstack/react-query';

import {
  ChatType,
  OneOnOneChat,
  useProfile,
  useSocket,
} from '@social-media/api';
import { Button, Modal } from '@social-media/evoke-ui';

interface DeleteMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  messageId: string;
  chatId: string;
  chatType: ChatType;
}

const DeleteMessageModal: React.FC<DeleteMessageModalProps> = ({
  isOpen,
  onClose,
  chatId,
  messageId,
  chatType,
}) => {
  const { deleteMessage, deleteGroupMessage } = useSocket();
  const queryClient = useQueryClient();
  const { data: user } = useProfile();

  const handleDelete = () => {
    try {
      if (chatType === ChatType.ONE_ON_ONE) {
        const chatData = queryClient.getQueryData<OneOnOneChat>([
          'one-on-one',
          chatId,
        ]);
        if (chatData && user)
          deleteMessage(chatId, messageId, user.id, chatData.vanishMode);
      } else if (chatType === ChatType.GROUP) {
        // scope for vanish mode in group chats in future version
        deleteGroupMessage(chatId, messageId);
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    } finally {
      onClose();
    }
  };

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      size="sm"
      className="dark:bg-dark-modalColor"
      closeOnOverlayClick={true}
    >
      <Modal.Header className="text-xl font-semibold font-primary dark:text-dark-lavender">
        Delete Message
      </Modal.Header>
      <Modal.Content className="dark:text-dark-lavender">
        Are you sure you want to delete this message?
      </Modal.Content>
      <Modal.Footer className="flex justify-end gap-x-2">
        <Button
          variant="ghost"
          className="w-fit dark:text-dark-silverSteel"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          className="w-fit bg-red-500 dark:text-dark-lavender hover:bg-red-700"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteMessageModal;
