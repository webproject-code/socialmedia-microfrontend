import { GroupChat, OneOnOneChat } from './chat-types';

export type ApiResponse<
  TSuccess = boolean,
  TMessage = string,
  TData = unknown | null
> = {
  success: TSuccess;
  message: TMessage;
  data: TData;
};

export interface ChatsListService {
  fetchChatList(
    searchTerm: string | undefined,
    cursor?: string
  ): Promise<{
    chats: Chat[];
    friendsWithNoChats: [];
    pagination: {
      totalCount: number;
      hasNextPage: boolean;
      nextCursor: string;
    };
  }>;
  fetchFriendWithNoChat(
    searchTerm: string,
    userId: string,
    cursor: string
  ): Promise<{
    friends: Friends[];
    pagination: {
      hasNextPage: boolean;
      nextCursor: string;
    };
  }>;
  createOneOnOneChat(
    initiatorId: string,
    participantId: string
  ): Promise<ChatInfo>;

  checkOneOnOneChatStatus(
    user1Id: string,
    user2Id: string
  ): Promise<checkOneOnOneChat>;

  createGroupChat(groupData: groupData): Promise<createGroupChatResponse>;
}

export type checkOneOnOneChat = {
  data: null | ChatInfo;
};

export type ChatInfo = {
  id: string;
  initiatorId: string;
  participantId: string;
  vanishMode: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date;
  // deletedForInitiator: null,
  // deletedForParticipant: null
};

export type groupData = {
  name: string;
  ownerId: string;
  memberIds: string[];
  groupDescription: string;
  groupIcon?: File | undefined;
};

export type Friends = {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
};

export type ChatsListServiceResponse = Awaited<
  ReturnType<ChatsListService['fetchChatList']>
>;

export type FriendsWithNochatResponse = Awaited<
  ReturnType<ChatsListService['fetchFriendWithNoChat']>
>;

export type createOneOnOneChatResponse = Awaited<
  ReturnType<ChatsListService['createOneOnOneChat']>
>;

export type checkOneOnOneChatStatusResponse = Awaited<
  ReturnType<ChatsListService['checkOneOnOneChatStatus']>
>;

export type Chat = OneOnOneChat | GroupChat;

export type createGroupChatResponse = Omit<GroupChat, 'type' | 'messages'>;
