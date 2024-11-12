import { z } from 'zod';
import {
  registrationStepOneSchema,
  registrationStepTwoSchema,
} from '../schemas';
import { StateCreator } from 'zustand';

// Define the structure for each step using Zod inference
type RegisterFormData = {
  currentStep: number;
  step1: z.infer<typeof registrationStepOneSchema>;
  step2: z.infer<typeof registrationStepTwoSchema>;
};

export type RegistrationFormSlice = {
  registerForm: RegisterFormData;
  updateRegisterForm: (stepData: Partial<RegisterFormData>) => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  clearRegisterForm: () => void;
};

export const createRegistrationFormSlice: StateCreator<
  RegistrationFormSlice
> = (set) => ({
  // Initial form state
  registerForm: {
    currentStep: 1,
    step1: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    step2: {
      profilePicture: undefined,
    },
  },

  // Function to update form state based on the provided step data
  updateRegisterForm: (stepData) => {
    set((state) => ({
      registerForm: {
        ...state.registerForm,
        ...stepData,
      },
    }));
  },

  // Go to the next step
  goToNextStep: () => {
    set((state) => ({
      registerForm: {
        ...state.registerForm,
        currentStep: state.registerForm.currentStep + 1,
      },
    }));
  },

  // Go to the previous step
  goToPreviousStep: () => {
    set((state) => ({
      registerForm: {
        ...state.registerForm,
        currentStep: state.registerForm.currentStep - 1,
      },
    }));
  },

  // Function to clear the form data and reset to initial values
  clearRegisterForm: () => {
    set({
      registerForm: {
        currentStep: 1,
        step1: {
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        },
        step2: {
          profilePicture: undefined,
        },
      },
    });
  },
});
