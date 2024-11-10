import {
  ChatType,
  OneOnOneChat,
  OneOnOneChatSettings,
  useOneOnOneChatUpdate,
} from '@social-media/api';
import { Button } from '@social-media/evoke-ui';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';

interface ChatSettingsProps {
  chatType: ChatType;
}

const ChatSettings: React.FC<ChatSettingsProps> = ({ chatType }) => {
  const { chatId } = useParams();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useOneOnOneChatUpdate(chatId!);
  let chatData: OneOnOneChat | undefined;

  if (chatType === ChatType.ONE_ON_ONE) {
    chatData = queryClient.getQueryData<OneOnOneChat>(['one-on-one', chatId]);
  }

  const updateChatSettings = () => {
    let settings: OneOnOneChatSettings;
    if (chatType === ChatType.ONE_ON_ONE) {
      settings = {
        vanishMode: !chatData?.vanishMode,
      };
      mutate(settings);
    }
  };

  return (
    <Button className="w-fit" onClick={updateChatSettings} disabled={isPending}>
      Turn
      {chatData?.vanishMode ? (
        <span className="text-red-500">Off</span>
      ) : (
        <span className="text-green-500">On</span>
      )}
      Vanish Mode
    </Button>
  );
};

export default ChatSettings;
