import { RouteObject } from 'react-router-dom';
import Login from './pages/Login';
import Auth from './pages/AuthLayout';
import Home from './pages/Home';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/auth',
    element: <Auth />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
];
