import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Auth from './pages/AuthLayout';

import { createAuthSlice } from './store/authSlice';
import { createRegistrationFormSlice } from './store/registrationFormSlice';

export {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Auth,
  createAuthSlice,
  createRegistrationFormSlice,
};
