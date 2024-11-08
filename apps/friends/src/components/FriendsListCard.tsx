import { useNavigate } from 'react-router-dom';

import { Card, Divider } from '@social-media/evoke-ui';

import { useFriendshipStatus } from '@social-media/api';

import AcceptFriendRequestButton from './AcceptFriendRequestButton';
import RejectFriendRequestButton from './RejectFriendRequestButton';
import SendOrCancelRequestButton from './SendOrCancelRequestButton';

interface FriendsListCardProps {
  profile: string;
  name: string;
  cardType: 'request' | 'add' | 'search';
  currentUserId: string;
  userId: string;
  friendRequestId?: string;
}

const FriendsListCard: React.FC<FriendsListCardProps> = ({
  profile,
  name,
  cardType,
  userId,
  currentUserId,
  friendRequestId,
}) => {
  const navigate = useNavigate();
  const {
    data: friendshipStatusResponse,
    isLoading: isFriendshipStatusLoading,
    isSuccess: isFriendshipStatusSuccess,
  } = useFriendshipStatus(currentUserId, userId);

  return (
    <Card
      className="bg-transparent transition-colors hover:bg-light-secondary/10 dark:hover:bg-dark-secondary/20 cursor-pointer
      outline-none"
    >
      <Card.Content className="flex py-4 px-1 items-center justify-between gap-4">
        <div
          className="flex gap-3 items-center h-full"
          onClick={() =>
            navigate(`https://profile-mfe.netlify.app/users/${userId}`)
          }
        >
          <img
            className="w-11 h-11 rounded-full ring-1 ring-secondary"
            src={profile}
            alt="profile"
          />
          <div className="flex flex-col">
            <h6>{name}</h6>
          </div>
        </div>

        {cardType === 'request' && friendRequestId && (
          <div className="flex gap-2">
            <RejectFriendRequestButton
              userId={currentUserId}
              friendId={userId}
              friendRequestId={friendRequestId}
            />
            <AcceptFriendRequestButton
              userId={currentUserId}
              friendId={userId}
              friendRequestId={friendRequestId}
            />
          </div>
        )}

        {cardType === 'add' && isFriendshipStatusSuccess && (
          <SendOrCancelRequestButton
            userId={currentUserId}
            friendId={userId}
            disabled={isFriendshipStatusLoading}
            friendshipStatus={friendshipStatusResponse}
          />
        )}
      </Card.Content>
      <Divider
        alignment="horizontal"
        textAlign="center"
        type="solid"
        variant="fullWidth"
        className="border-b-0 border-gray-400"
      />
    </Card>
  );
};
export default FriendsListCard;
