import { ChatType } from '@social-media/api';
import { Avatar, AvatarImage, Card, Divider } from '@social-media/evoke-ui';
import { formatDate } from '@social-media/utils';
import { useNavigate } from 'react-router-dom';

interface ChatCardProps {
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  profileImage: string;
  chatId: string;
  type: ChatType;
}

export const ChatCard: React.FC<ChatCardProps> = ({
  name,
  lastMessage,
  lastMessageTime,
  profileImage,
  chatId,
  type,
}) => {
  const formattedMessageTime = formatDate(lastMessageTime);
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`${chatId}?type=${type}`);
  };
  const unreadCount = 3;
  return (
    <>
      <Card
        className="bg-transparent transition-colors hover:bg-light-secondary/10 dark:hover:bg-dark-secondary/20 cursor-pointer"
        onClick={handleCardClick}
      >
        <Card.Content className="p-2 sm:p-3">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Left side - Avatar and Text */}
            <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
              <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
                <AvatarImage src={profileImage} alt={name} />
              </Avatar>

              <div className="flex flex-col min-w-0">
                <h6 className="font-bold font-primary text-sm sm:text-base truncate">
                  {name}
                </h6>
                <p className="text-xs sm:text-sm text-light-silverSteel dark:text-dark-silverSteel truncate">
                  {lastMessage}
                </p>
              </div>
            </div>

            {/* Right side - Time and Unread Count */}
            <div className="flex flex-col items-end gap-1 sm:gap-2 flex-shrink-0">
              <span className="text-xs sm:text-sm text-light-silverSteel dark:text-dark-silverSteel whitespace-nowrap">
                {formattedMessageTime}
              </span>
              {unreadCount > 0 && (
                <span className="h-4 w-4 sm:h-5 sm:w-5 bg-light-secondary dark:bg-dark-secondary rounded-full flex items-center justify-center text-[10px] sm:text-xs text-light-primary dark:text-dark-primary">
                  {unreadCount}
                </span>
              )}
            </div>
          </div>
        </Card.Content>
      </Card>
      <Divider alignment="horizontal" className="my-1" />
    </>
  );
};
