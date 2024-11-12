import { useGroupChat } from '@social-media/api';
import { Avatar, AvatarImage, Button, Modal } from '@social-media/evoke-ui';
import React from 'react';

interface GroupChatInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: string;
}

const GroupChatInfoModal: React.FC<GroupChatInfoModalProps> = ({
  isOpen,
  onClose,
  groupId,
}) => {
  const { data } = useGroupChat(groupId);

  if (data)
    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="dark:bg-dark-modalColor"
        size="lg"
      >
        <Modal.Content className="p-2">
          <div className="flex flex-col items-center gap-y-2">
            <Avatar size="lg">
              <AvatarImage src={data.groupIcon} />
            </Avatar>
            <div className="dark:text-dark-lavender flex flex-col items-center p-2">
              <h1 className="font-semibold text-2xl">{data.name}</h1>
              <p>{`Group | ${data.memberIds.length} members`}</p>
            </div>

            <div className="h-[1px] dark:bg-gray-600 w-full" />
          </div>
          <div className="members-container py-2">
            <h2 className="text-xl dark:text-dark-lavender">Members</h2>
          </div>
        </Modal.Content>
        <Modal.Footer className="flex justify-end">
          <Button className="w-fit">Close</Button>
        </Modal.Footer>
      </Modal>
    );
};

export default GroupChatInfoModal;
