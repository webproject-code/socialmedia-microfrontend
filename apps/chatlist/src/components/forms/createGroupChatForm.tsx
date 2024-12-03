import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@social-media/evoke-ui';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { createGroupChatSchema } from '@social-media/utils';
import { useEffect, useState } from 'react';
import { useCreateGroupChat } from '@social-media/api';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@social-media/utils';
import { FaCamera } from 'react-icons/fa';

interface GroupChatFormProps {
  ownerId: string;
  memberList: { id: string; name: string }[];
  setMemberList: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }[]>
  >;
  onCancel: () => void;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DefaultGroupIcon = 'assets/images/group-svgrepo-com.svg';

export const CreateGroupChatForm: React.FC<GroupChatFormProps> = ({
  ownerId,
  memberList,
  setMemberList,
  onCancel,
  closeModal,
}) => {
  type FormType = z.infer<typeof createGroupChatSchema>;
  const [groupIcon, setGroupIcon] = useState<string>(DefaultGroupIcon);
  const { mutate, isPending } = useCreateGroupChat();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(createGroupChatSchema),
    defaultValues: {
      name: '',
      ownerId: ownerId,
      groupIcon: undefined,
      groupDescription: '',
      memberIds: memberList.map((user) => user.id),
    },
  });

  useEffect(() => {
    setValue(
      'memberIds',
      memberList.map((user) => user.id)
    );
  }, [memberList, setValue]);

  const resetForm = () => {
    reset();
    setGroupIcon(DefaultGroupIcon);
    setMemberList([]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setGroupIcon(URL.createObjectURL(file));

    clearErrors('groupIcon');
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue('groupIcon', file);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    if (!data.groupIcon) {
      try {
        const response = await fetch(DefaultGroupIcon);
        const blob = await response.blob();
        data.groupIcon = new File([blob], 'default-group-icon.png', {
          type: 'image/png',
        });
      } catch (error) {
        console.error('Error creating File from default icon:', error);
        setError('groupIcon', { message: 'Failed to set default group icon' });
        return;
      }
    }

    if (data.groupIcon && data.memberIds.length !== 0) {
      mutate(data, {
        onSuccess(data) {
          closeModal(false);
          resetForm();
          navigate(`/chats/group/${data.id}`);
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-4">
      <div className="flex flex-col items-center mb-8">
        {/* Group Icon Container */}
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 ring-4 ring-white dark:ring-gray-900 shadow-lg group">
          <img
            src={groupIcon}
            alt="Group Icon"
            className="w-full h-full object-cover"
          />
          {/* Hover Overlay */}
          <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <FaCamera className="w-6 h-6 text-white cursor-pointer" />
            {/* File Input */}
            <input
              type="file"
              accept="image/jpeg,image/png,image/svg+xml,image/svg"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Upload group icon"
            />
          </label>
        </div>
        {/* Error Message */}
        {errors.groupIcon && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 ">
            {errors.groupIcon.message}
          </p>
        )}
      </div>

      <div className="space-y-4">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div className="space-y-1">
              <Input
                {...field}
                type="text"
                label="Group Name"
                placeholder="Enter a name for your group"
                error={!!errors.name}
                errorMessage={errors.name?.message}
                required
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              />
            </div>
          )}
        />

        <Controller
          name="groupDescription"
          control={control}
          render={({ field }) => (
            <div className="space-y-1">
              <Input
                {...field}
                type="text"
                label="Description"
                placeholder="What's this group about?"
                required
                error={!!errors.groupDescription}
                errorMessage={errors.groupDescription?.message}
                className="w-full font-primary px-4 py-2  dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600"
              />
            </div>
          )}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          className="font-primary border-2 border-red-400 text-red-400 hover:bg-red-500 hover:text-light-primary focus-visible:ring-2
          focus-visible:ring-red-500
          focus-visible:ring-offset-2
          dark:focus-visible:ring-red-500
          dark:focus-visible:ring-offset-dark-primary
          outline-none"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          variant={'solid'}
          className="font-primary dark:text-dark-primary dark:bg-dark-secondary focus-visible:ring-2
          focus-visible:ring-light-secondary
          focus-visible:ring-offset-2
          dark:focus-visible:ring-dark-secondary
          dark:focus-visible:ring-offset-dark-primary
          outline-none"
        >
          {isPending ? <Spinner /> : 'Create Group'}
        </Button>
      </div>
    </form>
  );
};
