export interface User {
  id: string;
  email: string;
  name: string;
  bio: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  accessToken: string;
  expiresIn: number;
}

export type ApiResponse<
  TSuccess = boolean,
  TMessage = string,
  TData = unknown | null
> = {
  success: TSuccess;
  message: TMessage;
  data: TData;
};

export interface IAuthService {
  login(credentials: { email: string; password: string }): Promise<User>;
}

export interface ChatsListService {
  fetchChatList(
    searchTerm: string | undefined,
    cursor?: string | null | undefined
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
    cursor: string | null | undefined
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
  ): Promise<{
    id: string;
    initiatorId: string;
    participantId: string;
    vanishMode: boolean;
    createdAt: string;
    updatedAt: string;
    lastMessageAt: string;
    // deletedForInitiator: null,
    // deletedForParticipant: null
  }>;

  checkOneOnOneChatStatus(user1Id: string, user2Id: string): Promise<ChatInfo>;

  createGroupChat(groupData: groupData): Promise<createGroupChatResponse>;
}

export type ChatInfo = {
  id: string;
  initiatorId: string;
  participantId: string;
  vanishMode: boolean;
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string;
  // deletedForInitiator: null,
  // deletedForParticipant: null
};

export type groupData = {
  name: string;
  ownerId: string;
  memberIds: string[];
  groupDescription: string;
  groupIcon: File | undefined;
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
  | ReturnType<ChatsListService['createOneOnOneChat']>
  | ReturnType<ChatsListService['checkOneOnOneChatStatus']>
>;

export type checkOneOnOneChatStatusResponse = Awaited<
  ReturnType<ChatsListService['checkOneOnOneChatStatus']>
>;

export enum ChatType {
  ONE_ON_ONE = 'ONE_ON_ONE',
  GROUP = 'GROUP',
}

export type ChatUser = {
  id: string;
  name: string;
  profilePicture: string;
  isDeleted: boolean;
};

export type Message = {
  id: string;
  content: string;
  senderId: string;
  oneOnOneChatId: string;
  groupChatId: null;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  sender: {
    id: string;
    name: string;
    isDeleted: boolean;
  };
};

export type OneOnOneChat = ChatInfo & {
  initiator: ChatUser;
  participant: ChatUser;
  messages: Message[];
  type: ChatType.ONE_ON_ONE;
  name: string;
};

export type GroupChat = {
  id: string;
  name: string;
  ownerId: string;
  groupDescription: string;
  groupIcon: string;
  createdAt: string;
  updatedAt: string;
  lastMessageAt: string;
  memberIds: string[];
  messages: Message[];
  type: ChatType.GROUP;
};

export type Chat = OneOnOneChat | GroupChat;

export type createGroupChatResponse = Omit<GroupChat, 'type' | 'messages'>;
