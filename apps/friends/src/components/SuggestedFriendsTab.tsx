import { ScrollArea } from '@social-media/evoke-ui';
import FriendsListCardSkeleton from './FriendsListCardSkeleton';
import IllustrationImage from './IllustrationImage';
import FriendsListCard from './FriendsListCard';
import LoadingSpinner from './LoadingSpinner';
import { useSuggestedFriends } from '@social-media/api';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

interface SuggestedFriendsTabProps {
  currentUserId: string;
  illustrationPath: string;
}

const SuggestedFriendsTab: React.FC<SuggestedFriendsTabProps> = ({
  currentUserId,
  illustrationPath,
}) => {
  const queryClient = useQueryClient();
  const {
    suggestedFriends,
    isLoading: isSuggestedFriendsLoading,
    bottomRef: suggestedFriendsBottomRef,
    isFetchingNextPage: isFetchingNextSuggestedFriends,
  } = useSuggestedFriends(currentUserId);

  useEffect(() => {
    return () => {
      // revalidate suggested friends when user change tab or page
      queryClient.invalidateQueries({
        queryKey: ['suggestedFriends', currentUserId],
      });
    };
  }, [queryClient, currentUserId]);

  return (
    <>
      {isSuggestedFriendsLoading && (
        <div className="loading-container">
          <FriendsListCardSkeleton cardType="add" />
        </div>
      )}

      {!isSuggestedFriendsLoading && suggestedFriends.length === 0 && (
        <IllustrationImage
          src={illustrationPath}
          alt="no results"
          message="No new suggestions for now!"
        />
      )}

      {!isSuggestedFriendsLoading && suggestedFriends.length > 0 && (
        <ScrollArea>
          {suggestedFriends.map((user) => (
            <FriendsListCard
              key={user.id}
              profile={user.profilePicture}
              name={user.name}
              cardType="add"
              currentUserId={currentUserId}
              userId={user.id}
            />
          ))}
          <div ref={suggestedFriendsBottomRef} />
          {isFetchingNextSuggestedFriends && <LoadingSpinner />}
        </ScrollArea>
      )}
    </>
  );
};

export default SuggestedFriendsTab;
