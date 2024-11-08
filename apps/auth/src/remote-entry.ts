import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Auth from './pages/AuthLayout';

import { AuthSlice, createAuthSlice } from './store/authSlice';
import {
  RegistrationFormSlice,
  createRegistrationFormSlice,
} from './store/registrationFormSlice';

import { useStore } from './store/store';

export {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Auth,
  AuthSlice,
  RegistrationFormSlice,
  createAuthSlice,
  createRegistrationFormSlice,
  useStore,
};
