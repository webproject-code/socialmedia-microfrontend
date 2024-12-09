import { SocketProvider } from '@social-media/api';
import { RouteObject } from 'react-router-dom';
import { ChatsList } from './pages/chatsList';
import { Home } from './pages/home';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/chats',
    element: (
      <SocketProvider>
        <div className="h-screen">
          <ChatsList />
        </div>
      </SocketProvider>
    ),
  },
];
