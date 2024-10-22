import { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Stack } from '@social-media/evoke-ui';
import { useRegister } from '@social-media/api';
import { CiCirclePlus } from 'react-icons/ci';
import { AiFillCloseCircle } from 'react-icons/ai';
import { IoIosWarning } from 'react-icons/io';

import UploadImageWrapper from '../UploadImageWrapper';
import { registrationStepTwoSchema } from '../../schemas';
import { useStore } from '../../store/store';
import { Spinner } from '@social-media/utils';

const RegisterStepTwoForm: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { mutate, isPending, error } = useRegister();
  const {
    login,
    registerForm,
    updateRegisterForm,
    clearRegisterForm,
    goToPreviousStep,
  } = useStore();
  const navigate = useNavigate();

  const defaultAvatars = useMemo(
    () => [
      `assets/images/avatars/avatar1.svg`,
      `assets/images/avatars/avatar2.svg`,
      `assets/images/avatars/avatar3.svg`,
      `assets/images/avatars/avatar4.svg`,
    ],
    []
  );

  // Handle image selection and validation
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    const result = registrationStepTwoSchema.safeParse({
      profilePicture: file,
    });

    if (result.success) {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setProfilePicture(reader.result as string);
        reader.readAsDataURL(file);
        // Set profile picture preview
        updateRegisterForm({
          step2: { profilePicture: file },
        });
      }
      setErrorMessage(null);
    } else {
      // Set error message if validation fails
      setErrorMessage(result.error.errors[0]?.message || 'Invalid file');
      return;
    }
  };

  // Handle avatar selection
  const handleAvatarSelect = (avatar: string) => {
    updateRegisterForm({
      step2: { profilePicture: avatar },
    });
    setProfilePicture(avatar);
  };

  // Remove selected image or avatar
  const handleRemoveSelectedImage = () => {
    updateRegisterForm({
      step2: { profilePicture: undefined },
    });
    setProfilePicture(null);
  };

  const onSubmit = async () => {
    if (registerForm.step2.profilePicture) {
      let registerFormData = { ...registerForm.step1, ...registerForm.step2 };

      // If profilePicture is a string(default avatar), convert it to a File object
      if (typeof registerForm.step2.profilePicture === 'string') {
        const response = await fetch(registerForm.step2.profilePicture);
        const blob = await response.blob();
        const file = new File([blob], 'profile.svg', { type: 'image/svg' });
        registerFormData = { ...registerFormData, profilePicture: file };
      }

      mutate(
        registerFormData as {
          name: string;
          email: string;
          password: string;
          confirmPassword: string;
          profilePicture: File;
        },
        {
          onSuccess: (data) => {
            login({
              isAuthenticated: true,
              user: data,
            });
            clearRegisterForm();
            navigate('/');
          },
        }
      );
    }
  };

  return (
    <Stack direction="column" spacing="large">
      <Stack spacing="medium" align="center" wrap="wrap" justify="center">
        {/* Render default avatars */}
        {defaultAvatars.map((avatar, i) => (
          <img
            key={Math.random().toString(36).substring(2, 9)}
            src={avatar}
            alt={`default-profile-avatar-${i + 1}`}
            width={96}
            height={96}
            onClick={() => handleAvatarSelect(avatar)}
            className={`cursor-pointer rounded-full ${
              profilePicture === avatar &&
              'ring-2 ring-light-secondary dark:ring-dark-secondary'
            }`}
          />
        ))}

        {/* Display selected image or prompt to add an image */}
        {profilePicture && profilePicture.startsWith('data:image') ? (
          <Box className="relative">
            <UploadImageWrapper
              src={profilePicture}
              alt="selected-profile-picture"
            />
            <AiFillCloseCircle
              className="absolute -top-1 -right-1 h-6 w-6 text-red-600 hover:cursor-pointer hover:text-red-800"
              onClick={handleRemoveSelectedImage}
            />
          </Box>
        ) : (
          <>
            <CiCirclePlus
              className="h-24 w-24 cursor-pointer hover:text-light-secondary dark:hover:text-dark-secondary"
              onClick={() => fileInputRef.current?.click()}
            ></CiCirclePlus>
            <input
              name="profilePicture"
              type="file"
              accept="image/jpg,image/png"
              onChange={handleImageChange}
              ref={fileInputRef}
              className="hidden"
            />
          </>
        )}
      </Stack>
      {/* Display error message if any */}
      {errorMessage && (
        <Box>
          <p className="text-red-600 dark:text-red-400 text-center">
            {errorMessage}
          </p>
        </Box>
      )}

      <Button disabled={isPending} onClick={onSubmit}>
        {!isPending ? (
          'Create Account'
        ) : (
          <Spinner className="fill-light-primary dark:fill-dark-primary" />
        )}
      </Button>
      {/* Display API error message if exists */}
      {error && (
        <Stack
          align={'center'}
          spacing={'small'}
          className="p-4 rounded-md border border-red-600 bg-red-300/50 dark:bg-red-700/50 text-red-400"
        >
          <IoIosWarning />
          <p>{error.message}</p>
        </Stack>
      )}

      <Button
        variant="link"
        onClick={goToPreviousStep}
        className="dark:text-white"
      >
        Back
      </Button>
    </Stack>
  );
};

export default RegisterStepTwoForm;
