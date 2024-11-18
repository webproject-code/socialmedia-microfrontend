import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@social-media/evoke-ui';
import React from 'react';
import FriendsTab from './FriendsTab';
import { UserProfile } from '@social-media/api';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import PostsTab from './PostsTab';

const ProfileTabs: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  const activeTab = useSearchParams()[0].get('activeTab') || 'friends';

  return (
    <Tabs defaultValue={activeTab} className="p-0 flex flex-1 h-0">
      <TabsList className="mb-0 h-fit justify-start text-lg bg-gray-200 dark:bg-dark-modalColor/40 border border-b-0 rounded-t-md border-light-silverSteel/30 dark:border-dark-silverSteel/3">
        <TabsTrigger
          value="friends"
          onClick={() => navigate(`${pathname}?activeTab=friends`)}
          className={`${
            activeTab === 'friends' &&
            'text-light-secondary dark:text-dark-secondary '
          }`}
        >
          <span className="font-semibold">Friends</span>
        </TabsTrigger>
        <TabsTrigger
          value="posts"
          onClick={() => navigate(`${pathname}?activeTab=posts`)}
          className={`${
            activeTab === 'posts' &&
            'text-light-secondary dark:text-dark-secondary '
          }`}
        >
          <span className="font-semibold">Posts</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="friends"
        className="h-[90%] border border-t-0 border-light-silverSteel/30 dark:border-dark-silverSteel/30 rounded-b-md"
      >
        <FriendsTab userId={profile.id} />
      </TabsContent>
      <TabsContent
        value="posts"
        className="h-[90%] border border-t-0 border-light-silverSteel/30 dark:border-dark-silverSteel/30 rounded-b-md"
      >
        <PostsTab />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
