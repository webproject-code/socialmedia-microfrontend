import { ScrollArea } from '@social-media/evoke-ui';
import FriendsListCardSkeleton from './FriendsListCardSkeleton';
import IllustrationImage from './IllustrationImage';
import FriendsListCard from './FriendsListCard';
import LoadingSpinner from './LoadingSpinner';
import { FriendSearch } from './FriendSearch';
import { useUsers } from '@social-media/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface SearchTabProps {
  currentUserId: string;
  illustrationPath: string;
  searchIllustrationPath: string;
}

const SearchTab: React.FC<SearchTabProps> = ({
  currentUserId,
  illustrationPath,
  searchIllustrationPath,
}) => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('searchTerm') || ''
  );

  const pathname = window.location.pathname;

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    searchParams.set('searchTerm', term);
    if (term === '') {
      searchParams.delete('searchTerm');
    }
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const { users, isLoading, bottomRef, isFetchingNextPage } = useUsers({
    query: searchTerm,
  });

  return (
    <>
      <FriendSearch onSearch={handleSearch} searchTerm={searchTerm} />
      {isLoading && (
        <div className="loading-container">
          <FriendsListCardSkeleton cardType="search" />
        </div>
      )}

      {!isLoading && !searchTerm && (
        <IllustrationImage src={searchIllustrationPath} alt="search" />
      )}

      {!isLoading && searchTerm && users.length === 0 && (
        <IllustrationImage
          src={illustrationPath}
          alt="no results"
          message="No such users found!"
        />
      )}

      {!isLoading && searchTerm && users.length > 0 && (
        <ScrollArea className="h-full p-1">
          {users.map((user) => (
            <FriendsListCard
              key={user.id}
              profile={user.profilePicture}
              name={user.name}
              cardType="search"
              currentUserId={currentUserId}
              userId={user.id}
            />
          ))}
          <div ref={bottomRef} />
          {isFetchingNextPage && <LoadingSpinner />}
        </ScrollArea>
      )}
    </>
  );
};

export default SearchTab;
