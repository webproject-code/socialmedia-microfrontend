import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@social-media/evoke-ui';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { createGroupChatSchema } from '@social-media/utils';
import { useEffect, useState } from 'react';
import { useCreateGroupChat } from '@social-media/api';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@social-media/utils';
import { RxCross2 } from 'react-icons/rx';
import { FaCamera } from 'react-icons/fa';
import { CiUser } from 'react-icons/ci';
interface GroupChatFormProps {
  ownerId: string;
  memberList: { id: string; name: string }[];
  setMemberList: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }[]>
  >;
  onCancel: () => void;
}

const DefaultGroupIcon = 'assets/Images/people.png';

export const CreateGroupChatForm: React.FC<GroupChatFormProps> = ({
  ownerId,
  memberList,
  setMemberList,
  onCancel,
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

    if (data.memberIds.length === 0) {
      setError('memberIds', {
        message: 'Please add at least one member to the group',
      });
      return;
    }

    if (data.groupIcon && data.memberIds.length !== 0) {
      mutate(data, {
        onSuccess(data) {
          navigate(`/chats/group/${data.id}`);
        },
      });
      resetForm();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('groupIcon', { message: 'File size must be less than 5MB' });
        return;
      }

      if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
        setError('groupIcon', {
          message: 'Only JPG, PNG & SVG formats are allowed',
        });
        return;
      }

      clearErrors('groupIcon');
      const reader = new FileReader();
      reader.onloadend = () => {
        setGroupIcon(reader.result as string);
        setValue('groupIcon', file);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeMember = (id: string) => {
    setMemberList((prevList) => prevList.filter((member) => member.id !== id));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-4">
      <div className="flex flex-col items-center mb-8">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 ring-4 ring-white dark:ring-gray-900 shadow-lg">
            <img
              src={groupIcon}
              alt="Group Icon"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <FaCamera className="w-6 h-6 text-white" />
            </div>
          </div>
          <input
            type="file"
            accept="image/jpeg,image/png,image/svg+xml"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Upload group icon"
          />
          {errors.groupIcon && (
            <p className="absolute -bottom-6 left-1/2 -translate-RxCross2-1/2 whitespace-nowrap text-sm text-red-500">
              {errors.groupIcon.message}
            </p>
          )}
        </div>
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

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-primary  dark:text-gray-300">
            Group Members
            <span className="text-red-500 ml-1">*</span>
          </label>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {memberList.length} selected
          </span>
        </div>

        {memberList.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {memberList.map((member) => (
              <div
                key={member.id}
                className="group font-primary flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full text-sm"
              >
                <span>{member.name}</span>
                <button
                  type="button"
                  onClick={() => removeMember(member.id)}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                  aria-label={`Remove ${member.name}`}
                >
                  <RxCross2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex font-primary items-center justify-center py-4 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <div className="text-center text-light-silverSteel-500 dark:text-dark-silverSteel">
              <CiUser className="w-6 h-6 mx-auto mb-2" />
              <p>Click on friends to add them to the group</p>
            </div>
          </div>
        )}

        {errors.memberIds && (
          <p className="text-sm text-red-500">{errors.memberIds.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
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
