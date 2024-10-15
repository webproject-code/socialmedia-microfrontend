import { Avatar, AvatarImage, Box, Card } from '@social-media/evoke-ui';

interface ChatCardProps {
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  profileImage: string;
}

export const ChatCard: React.FC<ChatCardProps> = ({
  name,
  lastMessage,
  lastMessageTime,
  profileImage,
}) => {
  return (
    <Card className="bg-transparent rounded-none">
      <Card.Content className="flex items-center justify-between gap-4 py-4 px-0">
        <Box className="flex gap-4 items-center h-full">
          <Avatar size="sm" className="ml-2">
            <AvatarImage src={profileImage} alt={name} />
          </Avatar>
          <Box className="flex flex-col font-secondary">
            <h6 className="font-bold font-primary text-[16px]">{name}</h6>
            <p className="text-sm text-light-silverSteel dark:text-dark-silverSteel truncate w-28 md:w-40 font-primary">
              {lastMessage}
            </p>
          </Box>
        </Box>
        <Box className="flex flex-col items-center gap-2 mr-2 w-[100px]">
          <h6 className="text-light-silverSteel dark:text-dark-silverSteel text-sm font-primary text-nowrap">
            {lastMessageTime}
          </h6>
          <span className=" h-4 w-4 text-light-primary dark:text-dark-primary text-[10px] font-primary bg-light-secondary dark:bg-dark-secondary rounded-full flex align-middle justify-center">
            2
          </span>
        </Box>
      </Card.Content>
    </Card>
  );
};
