import { zodResolver } from '@hookform/resolvers/zod';
import { useProfile } from '@social-media/api';
import { Button, Input } from '@social-media/evoke-ui';
import { useSocket } from '@social-media/utils';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as z from 'zod';

interface MessageInputProps {
  chatType: 'ONE_ON_ONE' | 'GROUP';
  chatId: string;
}

const MessageInputSchema = z.object({
  content: z.string().min(1),
});

const MessageInput: React.FC<MessageInputProps> = ({ chatId, chatType }) => {
  const { data: user } = useProfile();
  const { startTyping, stopTyping, sendMessage, sendGroupMessage } =
    useSocket();

  const onSend = ({ chatId, content }: { chatId: string; content: string }) => {
    if (chatType === 'ONE_ON_ONE') {
      sendMessage(chatId, content);
    } else if (chatType === 'GROUP') {
      sendGroupMessage(chatId, content);
    }
  };

  const handleTyping = () => {
    if (chatId && user?.id) {
      startTyping(chatId, user.name);
      setTimeout(
        () => stopTyping(chatId, user.name),

        3000
      );
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
      onSend({ chatId, content: values.content });
      reset();
      setFocus('content');
      stopTyping(chatId, user.name);
    }
  };
  return (
    <div className="message-input">
      <form onSubmit={handleSubmit(onSubmit)}>
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
            />
          )}
        />
        <Button className="w-fit dark:text-zinc-300" type="submit">
          Send
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
