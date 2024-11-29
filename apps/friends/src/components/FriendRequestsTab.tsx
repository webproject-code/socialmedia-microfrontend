import { ScrollArea } from '@social-media/evoke-ui';
import FriendsListCardSkeleton from './FriendsListCardSkeleton';
import IllustrationImage from './IllustrationImage';
import FriendsListCard from './FriendsListCard';
import LoadingSpinner from './LoadingSpinner';
import { useFriendRequests } from '@social-media/api';

interface FriendRequestsTabProps {
  currentUserId: string;
  illustrationPath: string;
}

const FriendRequestsTab: React.FC<FriendRequestsTabProps> = ({
  currentUserId,
  illustrationPath,
}) => {
  const { friendRequests, isLoading, bottomRef, isFetchingNextPage } =
    useFriendRequests(currentUserId);

  return (
    <>
      {isLoading && (
        <div className="loading-container">
          <FriendsListCardSkeleton cardType="request" />
        </div>
      )}

      {!isLoading && friendRequests?.length === 0 && (
        <IllustrationImage
          src={illustrationPath}
          alt="no results"
          message="No new friend requests!"
        />
      )}

      {!isLoading && friendRequests?.length > 0 && (
        <ScrollArea className="h-full p-1">
          {friendRequests?.map((request) => (
            <FriendsListCard
              key={request.id}
              profile={request.sender.profilePicture}
              name={request.sender.name}
              cardType="request"
              currentUserId={currentUserId}
              incomingRequestId={request.id}
              userId={request.sender.id}
            />
          ))}
          <div ref={bottomRef} />
          {isFetchingNextPage && <LoadingSpinner />}
        </ScrollArea>
      )}
    </>
  );
};

export default FriendRequestsTab;
