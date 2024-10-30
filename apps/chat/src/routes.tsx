import { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import Chats from './pages/Chats';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/chats',
    element: <Chats />,
  },
];
