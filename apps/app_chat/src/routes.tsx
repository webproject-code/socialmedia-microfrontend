import { RouteObject } from 'react-router-dom';
import Chats from './pages/Chats';
import GroupChat from './pages/GroupChat'; // Import your GroupChat component
import Home from './pages/Home';
import OneOnOneChat from './pages/OneOnOneChat'; // Import your OneOnOneChat component
import { SocketProvider } from '@social-media/utils';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/chats',
    element: (
      <SocketProvider>
        <Chats />
      </SocketProvider>
    ), // Parent Chats component
    children: [
      {
        path: 'one-on-one/:chatId', // Nested route for one-on-one chat
        element: <OneOnOneChat />,
      },
      {
        path: 'group/:chatId', // Nested route for group chat
        element: <GroupChat />,
      },
    ],
  },
];
