import {
  Avatar,
  AvatarImage,
  Box,
  Card,
  Divider,
} from '@social-media/evoke-ui';
import React, { useCallback } from 'react';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import { KeyboardEvent as ReactKeyboardEvent } from 'react';
import { FaUserMinus } from 'react-icons/fa';
interface FriendCardProps {
  name: string;
  email: string;
  profilePicture: string;
  onClickHandler: () => void;
  groupChat?: boolean;
  selectedMember?: boolean;
}

export const FriendCard: React.FC<FriendCardProps> = ({
  name,
  email,
  profilePicture,
  onClickHandler,
  groupChat,
  selectedMember,
}) => {
  const handleKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClickHandler();
      }
    },
    [onClickHandler]
  );

  return (
    <>
      <Card
        className=" bg-transparent transition-colors hover:bg-light-secondary/10 dark:hover:bg-dark-secondary/20 cursor-pointer outline-none
          focus-visible:ring-2 
          focus-visible:ring-light-secondary
          focus-visible:ring-offset-2
          dark:focus-visible:ring-dark-secondary
          dark:focus-visible:ring-offset-dark-primary"
        onClick={onClickHandler}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label={'chat'}
      >
        <Card.Content className="p-2">
          <Box className="flex items-center justify-between gap-2 sm:gap-4">
            <Box className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                <AvatarImage
                  src={profilePicture}
                  alt={name}
                  className="ring-0 shadow-lg"
                />
              </Avatar>
              <Box className="flex flex-col min-w-0">
                <h6 className="font-bold font-primary text-sm sm:text-base truncate">
                  {name}
                </h6>
                <p className="text-xs sm:text-sm text-light-silverSteel dark:text-dark-silverSteel truncate">
                  {email}
                </p>
              </Box>
            </Box>
            {selectedMember && <FaUserMinus className="text-red-500" />}
            {groupChat ? null : (
              <Box className="flex flex-col items-end gap-1 sm:gap-2 flex-shrink-0">
                <IoChatbubbleEllipses
                  size={25}
                  className="fill-light-secondary dark:fill-dark-secondary"
                />
              </Box>
            )}
          </Box>
        </Card.Content>
      </Card>
      <Divider
        alignment="horizontal"
        className="my-1 border-b-0 dark:border-dark-silverSteel border-light-silverSteel opacity-15"
      />
    </>
  );
};
