import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getChatList } from '../services/chatlist-services';
import { User } from '../types';
// import { useLogin } from './auth-hooks';

export const usersQueryKey = ['chatList'] as const;

export const useChatList = (
  userId?: string
): UseQueryResult<{ users: User[] }, Error> => {
  //   const { data, mutate } = useLogin();
  //   mutate({ email: 'adwaniritz@gmail.com', password: '12345678' });
  //   if (data) localStorage.setItem('token', data?.accessToken);
  return useQuery({
    queryKey: usersQueryKey,
    queryFn: () => getChatList(userId),
  });
};
