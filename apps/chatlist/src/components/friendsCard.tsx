import { useCreateOneOnOneChat } from '@social-media/api';
import {
  Avatar,
  AvatarImage,
  Box,
  Card,
  Divider,
} from '@social-media/evoke-ui';
import React from 'react';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface FriendCardProps {
  name: string;
  email: string;
  profilePicture: string;
  id: string;
}

export const FriendCard: React.FC<FriendCardProps> = ({
  name,
  email,
  profilePicture,
  id,
}) => {
  const CurrentUserId = '66b30bbeaea1612592e8609b';
  const navigate = useNavigate();
  const { mutate } = useCreateOneOnOneChat();

  const handleClick = () => {
    mutate(
      {
        initiatorId: CurrentUserId,
        participantId: id,
      },
      {
        onSuccess: (data) => {
          navigate(`/chat/${data.id}?type=ONE_ON_ONE`);
        },
      }
    );
  };

  return (
    <>
      <Card
        className=" bg-transparent transition-colors hover:bg-light-secondary/10 dark:hover:bg-dark-secondary/20 cursor-pointer"
        onClick={handleClick}
      >
        <Card.Content className="p-2">
          <Box className="flex items-center justify-between gap-2 sm:gap-4">
            <Box className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                <AvatarImage src={profilePicture} alt={name} />
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
            <Box className="flex flex-col items-end gap-1 sm:gap-2 flex-shrink-0">
              <IoChatbubbleEllipses
                size={30}
                className="fill-light-secondary dark:fill-dark-secondary"
              />
            </Box>
          </Box>
        </Card.Content>
      </Card>
      <Divider alignment="horizontal" className="my-1" />
    </>
  );
};
