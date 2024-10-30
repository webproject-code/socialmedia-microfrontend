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

export const GroupChatForm: React.FC<GroupChatFormProps> = ({
  ownerId,
  memberList,
  setMemberList,
}) => {
  type FormType = z.infer<typeof createGroupChatSchema>;
  const [groupIcon, setGroupIcon] = useState<string | null>(null);
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
    setGroupIcon(null);
    setMemberList([]);
  };

  const onSubmit: SubmitHandler<FormType> = (data) => {
    if (!data.groupIcon) {
      setError('groupIcon', { message: 'Add group icon' });
    }
    if (data.memberIds.length === 0) {
      setError('memberIds', { message: 'At least add 1 member in group' });
    }

    if (data.groupIcon && data.memberIds.length !== 0) {
      mutate(data, {
        onSuccess(data) {
          navigate(`/chat/${data.id}?type=GROUP`);
        },
      });
      // navigate(`/chat/${2}?type=GROUP`);
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
    <form onSubmit={handleSubmit(onSubmit)} className="mx-2 space-y-3">
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
          Members
          <p className="mt-1">(click on profile of friend to add in list)</p>
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {memberList.map((member) => (
            <div
              key={member.id}
              className="flex items-center bg-light-secondary text-light-primary dark:bg-dark-secondary dark:text-dark-primary  rounded-full px-3 py-1"
            >
              <span className="text-sm">{member.name}</span>
              <button
                type="button"
                onClick={() => removeMember(member.id)}
                className="ml-2 text-light-primary dark:text-dark-primary"
                aria-label={`Remove ${member.name}`}
              >
                <RxCross2 size={16} />
              </button>
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
