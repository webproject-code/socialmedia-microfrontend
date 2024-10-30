import { RouteObject } from 'react-router-dom';
import { NotFoundPage } from '@social-media/utils';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <div>Home</div>,
  },
  {
    path: '/friends',
    element: <div>Friends</div>,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
