import { RouteObject } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ErrorFallback, NotFoundPage } from '@social-media/utils';

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
      <Suspense fallback={<div>Loading...</div>}>
        <Auth />
      </Suspense>
    ),
    children: [
      {
        path: 'login',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: 'register',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ForgotPassword />
          </Suspense>
        ),
      },
      {
        path: 'reset-password',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ResetPassword />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PrivateRoute />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorFallback />
      </Suspense>
    ),
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Layout />
          </Suspense>
        ),
        children: [
          {
            path: '/',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: '/friends',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <FriendsPage />
              </Suspense>
            ),
          },
          {
            path: '/users/:id',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Profile />
              </Suspense>
            ),
          },
          {
            path: '/chats',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <ChatLayout />
              </Suspense>
            ),
            children: [
              {
                path: 'one-on-one/:chatId',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
                    <OneOnOneChat />
                  </Suspense>
                ),
              },
              {
                path: 'group/:chatId',
                element: (
                  <Suspense fallback={<div>Loading...</div>}>
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
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFoundPage />
      </Suspense>
    ),
  },
];
