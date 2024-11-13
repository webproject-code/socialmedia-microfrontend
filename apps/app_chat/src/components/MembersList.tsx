import { GroupMember } from '@social-media/api';
import {
  Avatar,
  AvatarImage,
  Button,
  Modal,
  ScrollArea,
} from '@social-media/evoke-ui';
import React, { useState } from 'react';
import { FaUserMinus } from 'react-icons/fa';

interface MembersListProps {
  members: GroupMember[];
  ownerId: string;
  currentUserId: string;
  onRemoveMember: (memberId: string) => void;
}

const MembersList: React.FC<MembersListProps> = ({
  members,
  ownerId,
  currentUserId,
  onRemoveMember,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<GroupMember | null>(
    null
  );

  const handleRemoveClick = (member: GroupMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (selectedMember) {
      onRemoveMember(selectedMember.id);
      setIsModalOpen(false);
      setSelectedMember(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2 max-h-full overflow-y-auto">
        <ScrollArea className="max-h-full px-0">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
            >
              <div className="flex items-center space-x-3">
                <Avatar size="sm">
                  <AvatarImage src={member.profilePicture} />
                </Avatar>
                <div className="flex flex-col">
                  <p className="font-medium dark:text-dark-lavender truncate">
                    {member.name} {member.id === ownerId && ` (Owner)`}
                  </p>
                  {member.bio && (
                    <p className="text-sm text-gray-500 dark:text-dark-silverSteel max-w-[200px] truncate">
                      {member.bio}
                    </p>
                  )}
                </div>
              </div>
              {currentUserId === ownerId && member.id !== ownerId && (
                <button
                  onClick={() => handleRemoveClick(member)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
                  aria-label={`Remove ${member.name}`}
                >
                  <FaUserMinus className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </ScrollArea>
      </div>
      {/* Confirmation Modal */}
      {selectedMember && (
        <ConfirmRemoveMemberModal
          isOpen={isModalOpen}
          onClose={closeModal}
          memberName={selectedMember.name}
          onConfirm={handleConfirmRemove}
        />
      )}
    </div>
  );
};

interface ConfirmRemoveMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberName: string;
  onConfirm: () => void;
}

const ConfirmRemoveMemberModal: React.FC<ConfirmRemoveMemberModalProps> = ({
  isOpen,
  onClose,
  memberName,
  onConfirm,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="sm"
      className="dark:bg-dark-modalColor"
      closeOnOutsideClick={true}
    >
      <Modal.Header className="text-xl font-semibold font-primary dark:text-dark-lavender">
        Remove Member
      </Modal.Header>
      <Modal.Content className="dark:text-dark-lavender">
        Are you sure you want to remove {memberName} from group?
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
          className="w-fit dark:bg-red-500 dark:text-dark-lavender hover:bg-red-700"
          onClick={onConfirm}
        >
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MembersList;
