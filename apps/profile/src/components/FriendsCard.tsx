import { Friend } from '@social-media/api';
import { Box, Stack } from '@social-media/evoke-ui';
import { IoChatbubbleEllipses } from 'react-icons/io5';

import { useNavigate } from 'react-router-dom';

type FriendsCardProps = {
  friend: Friend;
};

const FriendsCard: React.FC<FriendsCardProps> = ({ friend }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/users/${friend.id}`);
  };

  const handleNavigateToChat = () => {
    // Implement navigation to chat functionality here
  };

  return (
    <>
      <Stack
        align="center"
        justify="between"
        className="w-full border-2 border-light-silverSteel/10 dark:border-dark-silverSteel/10  rounded-md cursor-pointer dark:hover:bg-dark-modalColor/20 hover:bg-light-modalColor"
      >
        <div
          className="flex gap-4 items-center w-full cursor-pointer p-4"
          onClick={handleClick}
        >
          <img
            className="w-11 h-11 rounded-full ring-1 ring-secondary"
            src={friend.profilePicture}
            alt="profile"
          />
          <div className="flex flex-col">
            <h6>{friend.name}</h6>
            <p className="text-sm text-slate-600 dark:text-silverSteel">
              {friend.email}
            </p>
          </div>
        </div>
        <Box className="p-4">
          <IoChatbubbleEllipses
            className="h-6 w-6 text-light-secondary dark:text-dark-secondary cursor-pointer"
            onClick={handleNavigateToChat}
          />
        </Box>
      </Stack>
    </>
  );
};

export default FriendsCard;
