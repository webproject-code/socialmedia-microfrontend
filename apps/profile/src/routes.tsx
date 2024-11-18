import { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import { NotFoundPage } from '@social-media/utils';
import ProfileWrapper from './components/ProfileWrapper';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/users/:id',
    element: <ProfileWrapper />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
