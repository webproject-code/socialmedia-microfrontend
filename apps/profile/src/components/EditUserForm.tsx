import React, { useState } from 'react';
import { UserProfile, useProfileUpdate } from '@social-media/api';
import { Button, Input } from '@social-media/evoke-ui';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { editProfileSchema } from '../schema';
import { Spinner, StatusMessageBox } from '@social-media/utils';
import { useStore } from '../store/store';

const EditUserForm: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  // Initialize preview state with the existing profile picture URL
  const [preview, setPreview] = useState<string | undefined>(
    profile.profilePicture
  );
  const { setVisitedUser } = useStore();
  const { isPending, mutate, error, isSuccess } = useProfileUpdate();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      profilePicture: undefined,
      name: profile.name,
      bio: profile.bio,
    },
    mode: 'onChange',
  });

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (file: File | undefined) => void
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      onChange(file);

      setPreview(URL.createObjectURL(file)); // Update preview with new image URL
      return;
    }
    setPreview(profile.profilePicture);
    onChange(undefined);
  };

  const onSubmit = (data: z.infer<typeof editProfileSchema>) => {
    const updatedUser = { id: profile.id, ...data };
    mutate(updatedUser, {
      onSuccess: (data) => {
        setVisitedUser(data);
      },
    });
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          {/* Display current or new profile picture preview */}
          <img
            src={preview}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full object-cover"
          />
          {/* File input for profile picture */}
          <Controller
            name="profilePicture"
            control={control}
            render={({ field }) => (
              <Input
                name="profilePicture"
                type="file"
                accept="image/jpg, image/png, image/svg+xml"
                onChange={(e) => handleImageChange(e, field.onChange)}
                error={!!errors.profilePicture}
                errorMessage={errors.profilePicture?.message}
              />
            )}
          />
        </div>

        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Name"
              type="text"
              placeholder="John Doe"
              error={!!errors.name}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          name="bio"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              label="Bio"
              type="textarea"
              placeholder="Enter your bio"
              error={!!errors.bio}
              errorMessage={errors.bio?.message}
            />
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={isPending || !isDirty}
        >
          {isPending ? <Spinner /> : 'Update'}
        </Button>
      </form>
      {isSuccess && (
        <StatusMessageBox
          status="success"
          statusMessage="Profile updated successfully"
        />
      )}
      {error && (
        <StatusMessageBox status="error" statusMessage={error.message} />
      )}
    </div>
  );
};

export default EditUserForm;
