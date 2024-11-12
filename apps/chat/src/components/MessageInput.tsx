import { zodResolver } from '@hookform/resolvers/zod';
import { ChatType, OneOnOneChat, useProfile } from '@social-media/api';
import { Button, Input } from '@social-media/evoke-ui';
import { useSocket } from '@social-media/utils';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaPaperPlane } from 'react-icons/fa';
import * as z from 'zod';

interface MessageInputProps {
  chatType: ChatType;
  chatId: string;
}

const MessageInputSchema = z.object({
  content: z.string().min(1),
});

const MessageInput: React.FC<MessageInputProps> = ({ chatId, chatType }) => {
  const { data: user } = useProfile();
  const queryClient = useQueryClient();

  let chatData: OneOnOneChat | undefined;
  if (chatType === ChatType.ONE_ON_ONE) {
    chatData = queryClient.getQueryData<OneOnOneChat>(['one-on-one', chatId]);
  }
  const { startTyping, stopTyping, sendMessage, sendGroupMessage } =
    useSocket();

  const onSend = ({
    chatId,
    senderId,
    content,
  }: {
    chatId: string;
    senderId: string;
    content: string;
  }) => {
    if (chatType === ChatType.ONE_ON_ONE && chatData) {
      sendMessage(chatId, senderId, content, chatData.vanishMode);
    } else if (chatType === 'GROUP') {
      sendGroupMessage(chatId, senderId, content);
    }
  };

  const handleTyping = () => {
    if (chatId && user?.id) {
      startTyping(chatId, user.name);
      setTimeout(() => stopTyping(chatId, user.name), 3000);
    }
  };

  const form = useForm<z.infer<typeof MessageInputSchema>>({
    defaultValues: {
      content: '',
    },
    resolver: zodResolver(MessageInputSchema),
  });

  const {
    handleSubmit,
    control,
    reset,
    setFocus,
    formState: { errors },
  } = form;

  const onSubmit = (values: z.infer<typeof MessageInputSchema>) => {
    if (values.content.trim() && user) {
      onSend({ chatId, senderId: user.id, content: values.content });
      reset();
      setFocus('content');
      stopTyping(chatId, user.name);
    }
  };
  return (
    <div className="message-input sticky bottom-0 bg-light-primary dark:bg-dark-primary px-5 py-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-2 items-center justify-center"
      >
        <div className="w-full">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleTyping();
                  field.onChange(e);
                }}
                placeholder="Enter message..."
                error={!!errors.content}
                errorMessage={errors.content?.message}
                autoComplete="off"
              />
            )}
          />
        </div>
        <Button
          className="w-fit dark:text-dark-secondary"
          variant="ghost"
          type="submit"
        >
          <FaPaperPlane className="w-6 h-6" />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
