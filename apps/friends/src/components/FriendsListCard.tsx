import { useNavigate } from 'react-router-dom';

import { Card, Divider } from '@social-media/evoke-ui';

import { useFriendshipStatus } from '@social-media/api';

import AcceptFriendRequestButton from './AcceptFriendRequestButton';
import RejectFriendRequestButton from './RejectFriendRequestButton';
import SendOrCancelRequestButton from './SendOrCancelRequestButton';
import { useState } from 'react';

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
  const [requestStatus, setRequestStatus] = useState<
    'PENDING' | 'ACCEPTED' | 'REJECTED'
  >('PENDING');

  const {
    data: friendshipStatusResponse,
    isLoading: isFriendshipStatusLoading,
    isSuccess: isFriendshipStatusSuccess,
  } = useFriendshipStatus(currentUserId, userId);

  return (
    <Card
      role="article"
      aria-label={`Friend card for ${name}`}
      tabIndex={0}
      className="bg-transparent cursor-pointer outline-none transition-colors hover:bg-light-secondary/10 dark:hover:bg-dark-secondary/20
      focus-ring
      "
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/users/${userId}`);
        }
      }}
    >
      <Card.Content className="flex py-4 px-1 items-center justify-between gap-4">
        <div
          className="flex gap-3 items-center h-full w-full px-2"
          onClick={() => navigate(`/users/${userId}`)}
          role="button"
        >
          <img
            className="w-11 h-11 rounded-full ring-1 ring-secondary"
            src={profile}
            alt={`${name}'s profile picture`}
          />
          <div className="flex flex-col">
            <h6>{name}</h6>
          </div>
        </div>

        {cardType === 'request' &&
          (friendRequestId && requestStatus === 'PENDING' ? (
            <div className="flex gap-2">
              <RejectFriendRequestButton
                userId={currentUserId}
                friendId={userId}
                friendRequestId={friendRequestId}
                name={name}
                onReject={() => setRequestStatus('REJECTED')}
              />
              <AcceptFriendRequestButton
                userId={currentUserId}
                friendId={userId}
                friendRequestId={friendRequestId}
                name={name}
                onAccept={() => setRequestStatus('ACCEPTED')}
              />
            </div>
          ) : (
            <span
              className={`px-3 py-1 rounded-md border
                ${
                  requestStatus === 'ACCEPTED'
                    ? 'text-green-500 dark:text-green-400 border-green-500 dark:border-green-400'
                    : 'text-red-500 dark:text-red-400 border-red-500 dark:border-red-400'
                }
              `}
            >
              {requestStatus}
            </span>
          ))}

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
