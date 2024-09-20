import { RouteObject } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Chat from './pages/Chat';
import Friends from './pages/Friends';
import Profile from './pages/Profile';
import Layout from './components/Layout';

export const routes: RouteObject[] = [
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/chats',
        element: <Chat />,
      },
      {
        path: '/friends',
        element: <Friends />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
];
