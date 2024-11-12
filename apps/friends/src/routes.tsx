import { RouteObject } from 'react-router-dom';

import { NotFoundPage } from '@social-media/utils';

import Home from './pages/Home';
import FriendsWrapper from './components/FriendsWrapper';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/friends',
    element: <FriendsWrapper />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
