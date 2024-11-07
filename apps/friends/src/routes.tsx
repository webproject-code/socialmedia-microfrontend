import { RouteObject } from 'react-router-dom';

import { NotFoundPage } from '@social-media/utils';

import Friends from './pages/Friends';
import Home from './pages/Home';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/friends',
    element: <Friends />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
