import React, { useEffect, useState } from 'react';
import { useProfileUpdate } from '@social-media/api';
import { Button, Input } from '@social-media/evoke-ui';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Spinner, StatusMessageBox } from '@social-media/utils';
import { useStore, editProfileSchema } from '@social-media/utils';

const EditUserForm: React.FC = () => {
  // Get the current user data from the store
  const { user, updateUser } = useStore();
  // Initialize preview state with the existing profile picture URL
  const [preview, setPreview] = useState<string | undefined>(
    user?.profilePicture
  );
  const { isPending, mutate, error, isSuccess } = useProfileUpdate();

  // Effect to clean up preview URL
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      profilePicture: undefined,
      name: (user && user.name) || '',
      bio: (user && user.bio) || '',
    },
    mode: 'onChange',
  });

  if (!user) return null;

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
    setPreview(user.profilePicture);
    onChange(undefined);
  };

  const onSubmit = (data: z.infer<typeof editProfileSchema>) => {
    const updatedUser = { id: user.id, ...data };
    mutate(updatedUser, {
      onSuccess: (updatedData) => {
        // Update the user data in the store
        updateUser({
          ...user,
          name: updatedData.name,
          profilePicture: updatedData.profilePicture,
          bio: updatedData.bio,
        });
        // Reset the form to updated values
        reset({
          profilePicture: undefined,
          name: data.name,
          bio: data.bio,
        });
        // Reset the image preview as well
        setPreview(updatedData.profilePicture);
      },
    });
  };

  return (
    <div className="space-y-6">
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
          disabled={!isValid || isPending || !isDirty}
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
