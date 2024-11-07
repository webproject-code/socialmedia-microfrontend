import { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import { NotFoundPage } from '@social-media/utils';
import UserProfile from './pages/UserProfile';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/users/:id',
    element: <UserProfile />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
