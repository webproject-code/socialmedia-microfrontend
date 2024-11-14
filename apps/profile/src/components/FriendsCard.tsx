import { Friend } from '@social-media/api';
import { Box, Stack } from '@social-media/evoke-ui';
import { IoChatbubbleEllipses } from 'react-icons/io5';

import { useNavigate } from 'react-router-dom';
import { checkOneOnOneChatStatus } from '@social-media/api';
import { useStore } from '@social-media/utils';

type FriendsCardProps = {
  friend: Friend;
  userId: string;
};

const FriendsCard: React.FC<FriendsCardProps> = ({ friend, userId }) => {
  const navigate = useNavigate();
  const { user } = useStore();
  const isOwner = user?.id === friend.id;
  const handleClick = () => {
    navigate(`/users/${friend.id}`);
  };

  const handleNavigateToChat = () => {
    checkOneOnOneChatStatus(userId, friend.id).then((response) => {
      if (response.data) {
        navigate(`/chats/one-on-one/${response.data.id}`);
      }
    });
  };

  return (
    <Stack
      align="center"
      justify="between"
      className="w-full border-2 border-light-silverSteel/10 dark:border-dark-silverSteel/10  rounded-md cursor-pointer dark:hover:bg-dark-modalColor/20 hover:bg-light-modalColor focus-ring outline-0"
      tabIndex={0}
    >
      <div
        className="flex gap-4 items-center w-full cursor-pointer p-4"
        onClick={handleClick}
      >
        <img
          className="w-11 h-11 rounded-full"
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
      {!isOwner && (
        <Box className="p-4" onClick={handleNavigateToChat}>
          <IoChatbubbleEllipses
            tabIndex={0}
            className="h-6 w-6 text-light-secondary dark:text-dark-secondary cursor-pointer focus-ring outline-0"
          />
        </Box>
      )}
    </Stack>
  );
};

export default FriendsCard;
