import { useNavigate } from 'react-router-dom';

import {
  Box,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@social-media/evoke-ui';

import { useProfile } from '@social-media/api';
import { useTheme } from '@social-media/utils';

import FriendRequestsTab from '../components/FriendRequestsTab';
import SuggestedFriendsTab from '../components/SuggestedFriendsTab';
import SearchTab from '../components/SearchTab';

const Friends: React.FC = () => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const searchTerm = searchParams.get('searchTerm') || '';
  const theme = useTheme();

  const { data: profileData } = useProfile();
  const currentUserId = profileData?.id || '';

  const activeTab =
    new URLSearchParams(window.location.search).get('activeTab') || 'requests';
  const pathname = window.location.pathname;

  const handleTabChange = (tab: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set('activeTab', tab);
    // Only include search term in URL for search tab
    if (tab === 'search' && searchTerm !== '') {
      searchParams.set('searchTerm', searchTerm);
    }
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const getIllustrationPath = (isDarkTheme: boolean, imageName: string) =>
    `assets/images/${isDarkTheme ? 'dark' : 'light'}-${imageName}.svg`;

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
        <TabsContent value="requests" className="tabs-content-base">
          <FriendRequestsTab
            currentUserId={currentUserId}
            illustrationPath={getIllustrationPath(
              theme.isDarkTheme,
              'no-results-found-image'
            )}
          />
        </TabsContent>

        {/* Suggested Friends Tab */}
        <TabsContent value="suggestedFriends" className="tabs-content-base">
          <SuggestedFriendsTab
            currentUserId={currentUserId}
            illustrationPath={getIllustrationPath(
              theme.isDarkTheme,
              'no-results-found-image'
            )}
          />
        </TabsContent>

        {/* Search Tab */}
        <TabsContent value="search" className="tabs-content-base">
          <SearchTab
            currentUserId={currentUserId}
            illustrationPath={getIllustrationPath(
              theme.isDarkTheme,
              'no-results-found-image'
            )}
            searchIllustrationPath={getIllustrationPath(
              theme.isDarkTheme,
              'search-image'
            )}
          />
        </TabsContent>
      </Tabs>
    </Box>
  );
};

export default Friends;
