import { User } from '@social-media/api';
import { Avatar, AvatarImage, Box, Divider } from '@social-media/evoke-ui';

const ChatListHeader: React.FC<{ user: User }> = ({ user }) => {
  return (
    <>
      <Box className="flex gap-4 justify-stretch items-center py-3 px-2">
        <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
          <AvatarImage
            src={user.profilePicture}
            alt={'user-profile'}
            className="ring-0 shadow-lg"
          />
        </Avatar>
        <Box className="p-0">
          <h6 className="font-secondary font-bold text-light-secondary text-xl dark:text-dark-lavender">
            {user.name}
          </h6>
          <p className="font-secondary font-semibold text-sm dark:text-dark-secondary">
            Chats
          </p>
        </Box>
      </Box>
      <Divider
        alignment="horizontal"
        className="my-1 border-b-0 dark:border-dark-silverSteel border-light-silverSteel opacity-15"
      />
    </>
  );
};

export default ChatListHeader;
