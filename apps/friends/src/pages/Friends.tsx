import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import {
  Box,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@social-media/evoke-ui';

import {
  useFriendRequests,
  useProfile,
  useSuggestedFriends,
  useUsers,
} from '@social-media/api';
import { Spinner, useTheme } from '@social-media/utils';

import { FriendSearch } from '../components/FriendSearch';
import FriendsListCard from '../components/FriendsListCard';
import FriendsListCardSkeleton from '../components/FriendsListCardSkeleton';
import IllustrationImage from '../components/IllustrationImage';

const Friends: React.FC = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get('searchTerm') || ''
  );
  const theme = useTheme();

  const { data: profileData } = useProfile();

  const currentUserId = profileData?.id || '';
  const {
    friendRequests,
    isLoading: isFriendRequestsLoading,
    bottomRef: friendRequestsBottomRef,
    isFetchingNextPage: isFetchingNextFriendRequests,
  } = useFriendRequests(currentUserId);

  const {
    suggestedFriends,
    isLoading: isSuggestedFriendsLoading,
    bottomRef: suggestedFriendsBottomRef,
    isFetchingNextPage: isFetchingNextSuggestedFriends,
  } = useSuggestedFriends(currentUserId);

  const activeTab =
    new URLSearchParams(window.location.search).get('activeTab') || 'requests';
  const pathname = window.location.pathname;

  const {
    users,
    isLoading: isUsersLoading,
    bottomRef: usersBottomRef,
    isFetchingNextPage: isFetchingNextUsers,
  } = useUsers(activeTab === 'search' ? { query: searchTerm } : {});

  const handleTabChange = (tab: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set('activeTab', tab);
    // Only include search term in URL for search tab
    if (tab === 'search' && searchTerm !== '') {
      searchParams.set('searchTerm', searchTerm);
    }
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const handleSearch = (term: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    setSearchTerm(term);
    searchParams.set('searchTerm', term);
    if (term === '') {
      searchParams.delete('searchTerm');
    }
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <Box
      role="main"
      className="bg-light-primary dark:bg-dark-primary dark:text-white w-full h-full text-sm lg:text-md"
    >
      <Tabs defaultValue={activeTab} className="h-full p-0">
        <TabsList
          aria-label="Friendship management sections"
          className="mb-0 h-fit py-2 sm:py-4 justify-between sm:justify-start text-lg bg-gray-200 dark:bg-dark-modalColor/40 border border-b-0 rounded-t-md border-light-silverSteel/30 dark:border-dark-silverSteel/3"
        >
          <TabsTrigger
            value="requests"
            aria-label="Friend requests section"
            className={`${
              activeTab === 'requests' &&
              'text-light-secondary dark:text-dark-secondary'
            } outline-none focus-ring`}
            onClick={() => handleTabChange('requests')}
          >
            <span className="font-semibold">Requests</span>
          </TabsTrigger>
          <TabsTrigger
            value="suggestedFriends"
            aria-label="Suggested friends section"
            className={`${
              activeTab === 'suggestedFriends' &&
              'text-light-secondary dark:text-dark-secondary'
            } outline-none focus-ring`}
            onClick={() => handleTabChange('suggestedFriends')}
          >
            <span className="font-semibold">Suggested Friends</span>
          </TabsTrigger>
          <TabsTrigger
            value="search"
            aria-label="Search section"
            className={`${
              activeTab === 'search' &&
              'text-light-secondary dark:text-dark-secondary'
            } outline-none focus-ring`}
            onClick={() => handleTabChange('search')}
          >
            <span className="font-semibold">Search</span>
          </TabsTrigger>
        </TabsList>

        {/* Friend Requests Tab */}
        <TabsContent
          value="requests"
          className="h-[90%] border border-t-0 border-light-silverSteel/30 dark:border-dark-silverSteel/30 rounded-b-md"
        >
          {isFriendRequestsLoading && (
            <div className="p-2 h-[95%] overflow-hidden">
              <FriendsListCardSkeleton cardType="request" />
            </div>
          )}
          {!isFriendRequestsLoading && friendRequests?.length === 0 && (
            <IllustrationImage
              src={`assets/images/${
                theme.isDarkTheme ? 'dark' : 'light'
              }-no-results-found-image.svg`}
              alt="no results"
              message="No new friend requests!"
            />
          )}
          {!isFriendRequestsLoading && friendRequests?.length > 0 && (
            <ScrollArea className="h-[95%] p-1">
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
              <div ref={friendRequestsBottomRef} />
              {isFetchingNextFriendRequests && (
                <div className="flex my-3 justify-center">
                  <Spinner />
                </div>
              )}
            </ScrollArea>
          )}
        </TabsContent>

        {/* Suggested Friends Tab */}
        <TabsContent
          value="suggestedFriends"
          className="h-[90%] border border-t-0 border-light-silverSteel/30 dark:border-dark-silverSteel/30 rounded-b-md"
        >
          {isSuggestedFriendsLoading && (
            <div className="p-2 h-[95%] overflow-hidden">
              <FriendsListCardSkeleton cardType="add" />
            </div>
          )}
          {!isSuggestedFriendsLoading && suggestedFriends.length === 0 && (
            <IllustrationImage
              src={`assets/images/${
                theme.isDarkTheme ? 'dark' : 'light'
              }-no-results-found-image.svg`}
              alt="no results"
              message="No new suggestions for now!"
            />
          )}
          {!isSuggestedFriendsLoading && suggestedFriends.length > 0 && (
            <ScrollArea className="h-[95%] p-1">
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
              {isFetchingNextSuggestedFriends && (
                <div className="flex my-3 justify-center">
                  <Spinner />
                </div>
              )}
            </ScrollArea>
          )}
        </TabsContent>

        {/* Search Tab */}
        <TabsContent
          value="search"
          className="h-[90%] border border-t-0 border-light-silverSteel/30 dark:border-dark-silverSteel/30 rounded-b-md px-3"
        >
          <FriendSearch onSearch={handleSearch} searchTerm={searchTerm} />
          {isUsersLoading && (
            <div className="p-2 h-[95%] overflow-hidden">
              <FriendsListCardSkeleton cardType="search" />
            </div>
          )}
          {!searchTerm && (
            <IllustrationImage
              src={`assets/images/${
                theme.isDarkTheme ? 'dark' : 'light'
              }-search-image.svg`}
              alt="search"
            />
          )}
          {searchTerm && !isUsersLoading && users.length === 0 && (
            <IllustrationImage
              src={`assets/images/${
                theme.isDarkTheme ? 'dark' : 'light'
              }-no-results-found-image.svg`}
              alt="no results"
              message="No such users found!"
            />
          )}
          {!isUsersLoading && users.length > 0 && (
            <ScrollArea className="h-[95%] p-1">
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
              <div ref={usersBottomRef} />
              {isFetchingNextUsers && (
                <div className="flex my-3 justify-center">
                  <Spinner />
                </div>
              )}
            </ScrollArea>
          )}
        </TabsContent>
      </Tabs>
    </Box>
  );
};

export default Friends;
