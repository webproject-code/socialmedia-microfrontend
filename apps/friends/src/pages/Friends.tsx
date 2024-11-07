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
  const [searchTerm, setSearchTerm] = useState('');
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

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return (
    <Box className="bg-light-primary dark:bg-dark-primary dark:text-white w-screen h-screen text-sm lg:text-md">
      <Tabs defaultValue={activeTab} className="h-full border-0" border>
        <TabsList className="mb-4 h-fit justify-between sm:justify-start text-lg">
          <TabsTrigger
            value="requests"
            onClick={() => navigate(`${pathname}?activeTab=requests`)}
          >
            <span className="font-semibold">Requests</span>
          </TabsTrigger>
          <TabsTrigger
            value="suggestedFriends"
            onClick={() => navigate(`${pathname}?activeTab=suggestedFriends`)}
          >
            <span className="font-semibold">Suggested Friends</span>
          </TabsTrigger>
          <TabsTrigger
            value="search"
            onClick={() => navigate(`${pathname}?activeTab=search`)}
          >
            <span className="font-semibold">Search</span>
          </TabsTrigger>
        </TabsList>

        {/* Friend Requests Tab */}
        <TabsContent value="requests" className="h-[90%]">
          {isFriendRequestsLoading && (
            <FriendsListCardSkeleton cardType="request" />
          )}
          {!isFriendRequestsLoading && friendRequests?.length === 0 && (
            <IllustrationImage
              src={`../assets/images/${
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
                  friendRequestId={request.id}
                />
              ))}
              <div ref={friendRequestsBottomRef} />
              {isFetchingNextFriendRequests && <Spinner />}
            </ScrollArea>
          )}
        </TabsContent>

        {/* Suggested Friends Tab */}
        <TabsContent value="suggestedFriends" className="h-[90%]">
          {isSuggestedFriendsLoading && (
            <FriendsListCardSkeleton cardType="add" />
          )}
          {!isSuggestedFriendsLoading && suggestedFriends.length === 0 && (
            <IllustrationImage
              src={`../assets/images/${
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
              {isFetchingNextSuggestedFriends && <Spinner />}
            </ScrollArea>
          )}
        </TabsContent>

        {/* Search Tab */}
        <TabsContent value="search" className="h-[90%]">
          <FriendSearch onSearch={handleSearch} />
          {isUsersLoading && <FriendsListCardSkeleton cardType="search" />}
          {!searchTerm && (
            <IllustrationImage
              src={`../assets/images/${
                theme.isDarkTheme ? 'dark' : 'light'
              }-search-image.svg`}
              alt="search"
            />
          )}
          {searchTerm && !isUsersLoading && users.length === 0 && (
            <IllustrationImage
              src={`../assets/images/${
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
              {isFetchingNextUsers && <Spinner />}
            </ScrollArea>
          )}
        </TabsContent>
      </Tabs>
    </Box>
  );
};

export default Friends;
