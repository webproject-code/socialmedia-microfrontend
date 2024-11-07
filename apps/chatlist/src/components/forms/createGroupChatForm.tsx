import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@social-media/evoke-ui';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { createGroupChatSchema } from '../../schemas';
import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { useCreateGroupChat } from '@social-media/api';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@social-media/utils';

interface GroupChatFormProps {
  ownerId: string;
  memberList: { id: string; name: string }[];
  setMemberList: React.Dispatch<
    React.SetStateAction<{ id: string; name: string }[]>
  >;
}

const DefaultGroupIcon = 'assets/Images/people.png';

export const CreateGroupChatForm: React.FC<GroupChatFormProps> = ({
  ownerId,
  memberList,
  setMemberList,
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
      // setError('groupIcon', { message: 'Add group icon' });
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
      setError('memberIds', { message: 'At least add 1 member in group' });
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
        setError('groupIcon', { message: 'File size should be less than 5MB' });
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/svg+xml'].includes(file.type)) {
        setError('groupIcon', {
          message: 'Only .jpg, .png & .svg formats are allowed',
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
    <form onSubmit={handleSubmit(onSubmit)} className="mx-2 space-y-3 px-2">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            label="Name"
            placeholder="Enter group name"
            error={!!errors.name}
            errorMessage={errors.name?.message}
            required
          />
        )}
      />
      <Controller
        name="groupDescription"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            label="Group description"
            placeholder="Enter group description"
            error={!!errors.groupDescription}
            errorMessage={errors.groupDescription?.message}
          />
        )}
      />

      <div className="flex items-center space-x-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-200">
          {groupIcon && (
            <img
              src={groupIcon}
              alt="Group Icon"
              className="w-full h-full object-cover"
            />
          )}
          <input
            type="file"
            accept="image/jpeg,image/png,image/svg+xml"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Upload group icon"
          />
        </div>
        <div>
          <h3 className="text-lg font-primary dark:text-dark-lavender">
            Group Icon
          </h3>
          <p className="text-sm text-light-silverSteel font-primary dark:text-dark-lavender">
            Click on the circle for icon.
          </p>
          {errors.groupIcon && (
            <p className="text-sm text-red-500 mt-1">
              {errors.groupIcon.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-primary text-light-silverSteel dark:text-dark-silverSteel">
          Members <span className="text-red-500">*</span>
          <p className="mt-1">(click on profile of friend to add in list)</p>
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {memberList.map((member) => (
            <div
              key={member.id}
              className="flex items-center bg-light-secondary text-light-primary dark:bg-dark-secondary dark:text-dark-primary  rounded-full px-3 py-1"
            >
              <span className="text-sm">{member.name}</span>
              <Button
                type="button"
                onClick={() => removeMember(member.id)}
                className="ml-2 p-0 w-5 h-5 text-light-primary dark:text-dark-primary"
                aria-label={`Remove ${member.name}`}
              >
                <RxCross2 size={16} />
              </Button>
            </div>
          ))}
        </div>
        {errors.memberIds && (
          <p className="text-sm text-red-500 mt-1">
            {errors.memberIds.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-28 text-nowrap mt-2 float-end font-primary dark:bg-dark-secondary dark:text-dark-primary"
      >
        {isPending ? <Spinner /> : 'Create group'}
      </Button>
    </form>
  );
};
