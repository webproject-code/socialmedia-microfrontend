import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaCamera } from 'react-icons/fa';

import {
  useAddMembers,
  useGroupChat,
  useGroupChatUpdate,
  useGroupMembers,
  useProfile,
  useRemoveMembers,
} from '@social-media/api';
import {
  Avatar,
  AvatarImage,
  Button,
  Input,
  Modal,
} from '@social-media/evoke-ui';
import {
  GroupSettingsFormData,
  groupSettingsSchema,
} from '@social-media/utils';

import AddMembersList from './AddMembersList';
import MembersList from './MembersList';

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
  const [isAddingMembersOpen, setIsAddingMembersOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { data: userData } = useProfile();
  const { data: groupChat } = useGroupChat(groupId);

  const {
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<GroupSettingsFormData>({
    resolver: zodResolver(groupSettingsSchema),
    defaultValues: {
      name: groupChat?.name,
      groupDescription: groupChat?.groupDescription,
    },
  });

  const { data: membersData } = useGroupMembers(groupId);
  const updateSettingsMutation = useGroupChatUpdate(groupId);
  const addMembersMutation = useAddMembers(groupId);
  const removeMemberMutation = useRemoveMembers(groupId);

  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedIcon(file);

      const previewUrl = URL.createObjectURL(file);
      setPreviewUrl(previewUrl);
    }
  };

  const onSubmit = async (data: GroupSettingsFormData) => {
    console.log('submit called');
    try {
      await updateSettingsMutation.mutateAsync({
        settings: data,
        groupIcon: selectedIcon || undefined,
      });
      console.log('Group setting update successfully');
    } catch (error) {
      console.error('Failed to update group settings');
    }
  };

  const handleAddMembers = async (memberIds: string[]) => {
    try {
      if (groupChat) {
        await addMembersMutation.mutateAsync({
          ownerId: groupChat.ownerId,
          memberIds,
        });
        setIsAddingMembersOpen(false);
        console.log('Members added successfully');
      }
    } catch (error) {
      console.error('Failed to add members');
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    try {
      if (groupChat) {
        await removeMemberMutation.mutateAsync({
          ownerId: groupChat?.ownerId,
          memberId,
        });
        console.log('Member removed successfully');
      }
    } catch (error) {
      console.error('Failed to remove member');
    }
  };

  if (groupChat && userData) {
    const isOwner = userData?.id === groupChat.ownerId;
    return (
      <Modal show={isOpen} onClose={onClose} size="sm">
        <Modal.Header className="text-2xl text-light-secondary dark:text-dark-lavender">
          <div>
            <h1>Group Information</h1>
            <div className="text-sm text-gray-500 dark:text-dark-silverSteel">
              Created on {new Date(groupChat.createdAt).toLocaleDateString()}
            </div>
          </div>
        </Modal.Header>
        <Modal.Content className="p-2 overflow-y-auto">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Avatar size="lg" className="h-20 w-20">
                  <AvatarImage
                    src={previewUrl ? previewUrl : groupChat.groupIcon}
                    className="ring-0"
                  />
                </Avatar>
                {isOwner && (
                  <label className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full cursor-pointer">
                    <FaCamera className="text-white" />
                    <input
                      type="file"
                      accept="image/jpg, image/png"
                      name="Group icon"
                      onChange={handleIconChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="flex-1 space-y-4">
                <div>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Name"
                        type="text"
                        placeholder="Enter name"
                        error={!!errors.name}
                        errorMessage={errors.name?.message}
                        autoComplete="off"
                        disabled={!isOwner}
                      />
                    )}
                  />
                </div>
                <div>
                  <Controller
                    name="groupDescription"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="Description"
                        type="text"
                        placeholder="Enter description"
                        error={!!errors.groupDescription}
                        errorMessage={errors.groupDescription?.message}
                        autoComplete="off"
                        disabled={!isOwner}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end">
              {isOwner && (
                <Button
                  type="submit"
                  className="w-fit px-4 py-2 justify-self-end dark:bg-dark-secondary"
                  size="sm"
                  disabled={
                    updateSettingsMutation.isPending ||
                    (previewUrl === null && !isDirty)
                  }
                >
                  {updateSettingsMutation.isPending
                    ? 'Saving...'
                    : 'Save Changes'}
                </Button>
              )}
            </div>
          </form>

          <div className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semifold text-light-secondary dark:text-dark-lavender">
                  {isAddingMembersOpen
                    ? 'Add Members'
                    : `Members ${membersData?.members.length}`}
                </h3>
                {isOwner && !isAddingMembersOpen ? (
                  <Button
                    className="w-fit  dark:text-dark-secondary"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAddingMembersOpen(true)}
                  >
                    Add Members
                  </Button>
                ) : (
                  isOwner && (
                    <Button
                      className="w-fit  dark:text-dark-secondary"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAddingMembersOpen(false)}
                    >
                      Cancel
                    </Button>
                  )
                )}
              </div>
              {isAddingMembersOpen ? (
                <AddMembersList
                  onAddMembers={handleAddMembers}
                  existingMemberIds={groupChat.memberIds}
                  currentUserId={userData.id}
                />
              ) : (
                <MembersList
                  members={membersData?.members || []}
                  ownerId={groupChat.ownerId}
                  currentUserId={userData.id}
                  onRemoveMember={handleRemoveMember}
                />
              )}
            </div>
          </div>
        </Modal.Content>
      </Modal>
    );
  }
};

export default GroupChatInfoModal;
