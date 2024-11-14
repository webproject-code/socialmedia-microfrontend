import { PaginatedResponse, QueryPagination } from './utils-types';

export interface ChatUser {
  id: string;
  name: string;
  profilePicture: string;
  isDeleted: boolean;
}

export interface GroupMember extends ChatUser {
  bio: string;
}

export enum ChatType {
  ONE_ON_ONE = 'ONE_ON_ONE',
  GROUP = 'GROUP',
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  oneOnOneChatId: string;
  groupChatId: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  sender: ChatUser;
}

export interface OneOnOneChat {
  id: string;
  initiatorId: string;
  participantId: string;
  vanishMode: boolean;
  createdAt: string;
  updatedAt: string;
  initiator: ChatUser;
  participant: ChatUser;
  name: string;
  messages: Message[];
  unreadCount: number;
  type: ChatType.ONE_ON_ONE;
  lastMessageAt: string;
  // "deletedForInitiator": null,
  // "deletedForParticipant": null,
}

export interface OneOnOneChatSettings {
  vanishMode: boolean;
}

export interface GroupChat {
  id: string;
  name: string;
  ownerId: string;
  groupDescription: string;
  groupIcon: string;
  createdAt: string;
  updateAt: string;
  lastMessageAt: string;
  messages: Message[];
  memberIds: string[];
  type: ChatType.GROUP;
  unreadCount: number;
}

export interface GroupChatSettings {
  name?: string;
  groupDescription?: string;
  groupIcon?: File | undefined;
}

export interface IChatServices {
  getOneOnOneChat(chatId: string): Promise<OneOnOneChat>;
  updateOneOnOneChatSettings(
    chatId: string,
    settings: OneOnOneChatSettings
  ): Promise<OneOnOneChat>;
  getOneOnOneChatMessages(
    chatId: string,
    params?: QueryPagination
  ): Promise<PaginatedResponse<'messages', Message[]>>;
  getGroupChat(chatId: string): Promise<GroupChat>;
  updateGroupChat(
    chatId: string,
    settings: GroupChatSettings,
    groupIcon?: File
  ): Promise<GroupChat>;
  getGroupChatMessages(
    chatId: string,
    params?: QueryPagination
  ): Promise<PaginatedResponse<'messages', Message[]>>;
  getGroupMembers(
    chatId: string
  ): Promise<PaginatedResponse<'members', GroupMember[]>>;
  addGroupChatMembers(
    chatId: string,
    ownerId: string,
    memberIds: string[]
  ): Promise<string>;
  removeGroupChatMembers(
    chatId: string,
    ownerId: string,
    memberId: string
  ): Promise<string>;
  sendMessage(
    content: string,
    senderId: string,
    oneOnOneChatId?: string,
    groupChatId?: string
  ): Promise<Omit<Message, 'sender'>>;
  deleteMessage(messageId: string): Promise<string>;
}
