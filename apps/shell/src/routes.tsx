import { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

import {
  Auth,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
} from 'auth/Module';

import { UserProfile } from 'profile/Module';
import { Friends } from 'friends/Module';
import { ErrorFallback, NotFoundPage } from '@social-media/utils';

export const routes: RouteObject[] = [
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: '/',
    element: <PrivateRoute />, // Wraps the private routes
    errorElement: <ErrorFallback />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/friends',
            element: <Friends />,
          },
          {
            path: '/users/:id',
            element: <UserProfile />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
