import { RouteObject } from 'react-router-dom';
import { ChatsList } from './pages/chatsList';
import { Home } from './pages/home';
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
        <ChatsList />
      </SocketProvider>
    ),
  },
];
