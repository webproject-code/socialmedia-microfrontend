import { useNavigate } from 'react-router-dom';

import { Card, Divider } from '@social-media/evoke-ui';

import AcceptFriendRequestButton from './AcceptFriendRequestButton';
import RejectFriendRequestButton from './RejectFriendRequestButton';
import { useState } from 'react';
import CancelFriendRequestButton from './CancelFriendRequestButton';
import SendFriendRequestButton from './SendFriendRequestButton';

interface FriendsListCardProps {
  profile: string;
  name: string;
  cardType: 'request' | 'add' | 'search';
  currentUserId: string;
  userId: string;
  incomingRequestId?: string;
}

const FriendsListCard: React.FC<FriendsListCardProps> = ({
  profile,
  name,
  cardType,
  userId,
  currentUserId,
  incomingRequestId,
}) => {
  const navigate = useNavigate();
  const [requestStatus, setRequestStatus] = useState<
    'PENDING' | 'ACCEPTED' | 'REJECTED'
  >('PENDING');
  const [isFriendRequestSent, setIsFriendRequestSent] = useState(false);
  const [friendRequestId, setFriendRequestId] = useState('');

  return (
    <Card
      role="article"
      aria-label={`Friend card for ${name}`}
      tabIndex={0}
      className={`bg-transparent cursor-pointer outline-none focus-ring ${
        cardType === 'search' &&
        'transition-colors hover:bg-light-secondary/10 dark:hover:bg-dark-secondary/20'
      }`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/users/${userId}`);
        }
      }}
    >
      <Card.Content className="flex py-3 items-center justify-between gap-4 px-1">
        <div
          className="flex gap-3 items-center h-full w-full"
          onClick={() => navigate(`/users/${userId}`)}
          role="button"
        >
          <img
            className="w-11 h-11 rounded-full ring-1 ring-secondary"
            src={profile}
            alt={`${name}'s profile`}
          />
          <div className="flex flex-col">
            <h6>{name}</h6>
          </div>
        </div>

        {cardType === 'request' &&
          (incomingRequestId && requestStatus === 'PENDING' ? (
            <div className="flex gap-2">
              <RejectFriendRequestButton
                userId={currentUserId}
                friendId={userId}
                incomingRequestId={incomingRequestId}
                name={name}
                onReject={() => setRequestStatus('REJECTED')}
              />
              <AcceptFriendRequestButton
                userId={currentUserId}
                friendId={userId}
                incomingRequestId={incomingRequestId}
                name={name}
                onAccept={() => setRequestStatus('ACCEPTED')}
              />
            </div>
          ) : (
            <span
              className={`status-base ${
                requestStatus === 'ACCEPTED'
                  ? 'status-accepted'
                  : 'status-rejected'
              }`}
            >
              {requestStatus}
            </span>
          ))}

        {cardType === 'add' &&
          (isFriendRequestSent && friendRequestId ? (
            <CancelFriendRequestButton
              userId={currentUserId}
              friendId={userId}
              onCancel={() => setIsFriendRequestSent(false)}
              friendRequestId={friendRequestId}
            />
          ) : (
            <SendFriendRequestButton
              userId={currentUserId}
              friendId={userId}
              onSend={(requestId) => {
                setFriendRequestId(requestId);
                setIsFriendRequestSent(true);
              }}
            />
          ))}
      </Card.Content>
      <Divider
        alignment="horizontal"
        textAlign="center"
        type="solid"
        variant="fullWidth"
        className="border-b-0 dark:border-dark-silverSteel border-light-silverSteel opacity-15"
      />
    </Card>
  );
};
export default FriendsListCard;
