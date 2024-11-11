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

import { NotFoundPage } from '@social-media/utils';
import Friends from './pages/Friends';
import Profile from './pages/Profile';

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
            element: <Profile />,
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
