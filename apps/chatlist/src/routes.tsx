import { RouteObject, useParams, useSearchParams } from 'react-router-dom';
import { Home } from './pages/Home';
import { ChatsList } from './pages/chatsList';

const ChatMessageArea = () => {
  const { chatId } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type');
  return (
    <>
      chat message area
      {chatId}
      {type}
    </>
  );
};

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/chat',
    element: <ChatsList />,
  },
  {
    path: '/chat/:chatId',
    element: <ChatMessageArea />,
  },
];
