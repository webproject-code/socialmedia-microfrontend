import { ScrollArea, TabsContent } from '@social-media/evoke-ui';
import FriendsListCardSkeleton from './FriendsListCardSkeleton';
import IllustrationImage from './IllustrationImage';
import FriendsListCard from './FriendsListCard';
import LoadingSpinner from './LoadingSpinner';
import { useSuggestedFriends } from '@social-media/api';

interface SuggestedFriendsTabProps {
  currentUserId: string;
  illustrationPath: string;
}

const SuggestedFriendsTab: React.FC<SuggestedFriendsTabProps> = ({
  currentUserId,
  illustrationPath,
}) => {
  const {
    suggestedFriends,
    isLoading: isSuggestedFriendsLoading,
    bottomRef: suggestedFriendsBottomRef,
    isFetchingNextPage: isFetchingNextSuggestedFriends,
  } = useSuggestedFriends(currentUserId);

  return (
    <TabsContent value="suggestedFriends" className="tabs-content-base">
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
        <ScrollArea className="h-full p-1">
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
    </TabsContent>
  );
};

export default SuggestedFriendsTab;
