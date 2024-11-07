import { RouteObject, useParams, useSearchParams } from 'react-router-dom';
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
    path: '/chats',
    element: <ChatsList />,
    children: [
      {
        path: 'one-on-one/:chatId',
        element: <ChatMessageArea />,
      },
      {
        path: 'group/:chatId',
        element: <ChatMessageArea />,
      },
    ],
  },
];
