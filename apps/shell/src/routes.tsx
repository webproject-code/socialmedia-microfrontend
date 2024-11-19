import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ErrorFallback, NotFoundPage } from '@social-media/utils';
import Fallback from './components/Fallback';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Profile = lazy(() => import('./pages/Profile'));
const Layout = lazy(() => import('./components/Layout'));
const FriendsPage = lazy(() => import('./pages/Friends'));
const PrivateRoute = lazy(() => import('./components/PrivateRoute'));
const ChatLayout = lazy(() => import('./pages/ChatLayout'));

const Auth = lazy(() =>
  import('auth/Module').then((module) => ({ default: module.Auth }))
);
const Login = lazy(() =>
  import('auth/Module').then((module) => ({ default: module.Login }))
);
const Register = lazy(() =>
  import('auth/Module').then((module) => ({ default: module.Register }))
);
const ForgotPassword = lazy(() =>
  import('auth/Module').then((module) => ({ default: module.ForgotPassword }))
);
const ResetPassword = lazy(() =>
  import('auth/Module').then((module) => ({ default: module.ResetPassword }))
);
const OneOnOneChat = lazy(() =>
  import('app_chat/Module').then((module) => ({ default: module.OneOnOneChat }))
);
const GroupChat = lazy(() =>
  import('app_chat/Module').then((module) => ({ default: module.GroupChat }))
);

export const routes: RouteObject[] = [
  {
    path: '/auth',
    element: (
      <Suspense fallback={<Fallback />}>
        <Auth />
      </Suspense>
    ),
    children: [
      {
        path: 'login',
        element: (
          <Suspense fallback={<Fallback />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<Fallback />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <Suspense fallback={<Fallback />}>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: 'reset-password',
        element: (
          <Suspense fallback={<Fallback />}>
            <ResetPassword />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<Fallback />}>
        <PrivateRoute />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Fallback />}>
        <ErrorFallback />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Fallback />}>
            <Layout />
          </Suspense>
        ),
        children: [
          {
            path: '/',
            element: (
              <Suspense fallback={<Fallback />}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: '/friends',
            element: (
              <Suspense fallback={<Fallback />}>
                <FriendsPage />
              </Suspense>
            ),
          },
          {
            path: '/users/:id',
            element: (
              <Suspense fallback={<Fallback />}>
                <Profile />
              </Suspense>
            ),
          },
          {
            path: '/chats',
            element: (
              <Suspense fallback={<Fallback />}>
                <ChatLayout />
              </Suspense>
            ),
            children: [
              {
                path: 'one-on-one/:chatId',
                element: (
                  <Suspense fallback={<Fallback />}>
                    <OneOnOneChat />
                  </Suspense>
                ),
              },
              {
                path: 'group/:chatId',
                element: (
                  <Suspense fallback={<Fallback />}>
                    <GroupChat />
                  </Suspense>
                ),
              },
            ],
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
