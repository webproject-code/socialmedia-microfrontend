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
import { useTheme } from '@social-media/utils';

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
    data: friendRequestsData,
    isLoading: isRequestsLoading,
    isSuccess: isRequestsSuccess,
  } = useFriendRequests(currentUserId);

  const {
    data: suggestedFriendsData,
    isLoading: isSuggestedLoading,
    isSuccess: isSuggestedSuccess,
  } = useSuggestedFriends(currentUserId);

  const activeTab =
    new URLSearchParams(window.location.search).get('activeTab') || 'requests';
  const pathname = window.location.pathname;

  const {
    data: usersData,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
  } = useUsers(activeTab === 'search' ? { query: searchTerm } : {});

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const requests = friendRequestsData?.friendRequests;
  const suggestedFriends = suggestedFriendsData?.suggestedFriends;

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

        <TabsContent value="requests" className="h-[90%]">
          {isRequestsLoading && <FriendsListCardSkeleton cardType="request" />}
          {isRequestsSuccess && requests?.length === 0 ? (
            <IllustrationImage
              src={`../assets/images/${
                theme.isDarkTheme ? 'dark' : 'light'
              }-no-results-found-image.svg`}
              alt="no results"
              message="No new friend requests!"
            />
          ) : (
            <ScrollArea className="h-[95%] p-1">
              {requests?.map((request) => (
                <FriendsListCard
                  key={request.id}
                  profile={request.sender.profilePicture}
                  name={request.sender.name}
                  cardType="request"
                  currentUserId={currentUserId}
                  friendRequestId={request.id}
                />
              ))}
            </ScrollArea>
          )}
        </TabsContent>

        <TabsContent value="suggestedFriends" className="h-[90%]">
          {isSuggestedLoading && <FriendsListCardSkeleton cardType="add" />}
          {isSuggestedSuccess && suggestedFriends?.length === 0 ? (
            <IllustrationImage
              src={`../assets/images/${
                theme.isDarkTheme ? 'dark' : 'light'
              }-no-results-found-image.svg`}
              alt="no results"
              message="No new suggestions for now!"
            />
          ) : (
            <ScrollArea className="h-[95%] p-1">
              {suggestedFriends?.map((user) => (
                <FriendsListCard
                  key={user.id}
                  profile={user.profilePicture}
                  name={user.name}
                  cardType="add"
                  currentUserId={currentUserId}
                  userId={user.id}
                />
              ))}
            </ScrollArea>
          )}
        </TabsContent>

        <TabsContent value="search" className="h-[90%]">
          <FriendSearch onSearch={handleSearch} />
          {isUsersLoading && <FriendsListCardSkeleton cardType="search" />}
          {!usersData && (
            <IllustrationImage
              src={`../assets/images/${
                theme.isDarkTheme ? 'dark' : 'light'
              }-search-image.svg`}
              alt="search"
            />
          )}
          {isUsersSuccess && usersData?.users.length === 0 ? (
            <IllustrationImage
              src={`../assets/images/${
                theme.isDarkTheme ? 'dark' : 'light'
              }-no-results-found-image.svg`}
              alt="no results"
              message="No such users found!"
            />
          ) : (
            <ScrollArea className="h-[95%] p-1">
              {usersData?.users.map((user) => (
                <FriendsListCard
                  key={user.id}
                  profile={user.profilePicture}
                  name={user.name}
                  cardType="search"
                  currentUserId={currentUserId}
                  userId={user.id}
                />
              ))}
            </ScrollArea>
          )}
        </TabsContent>
      </Tabs>
    </Box>
  );
};

export default Friends;
