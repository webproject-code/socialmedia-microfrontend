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
    <Tabs defaultValue={activeTab} className="h-[90%] border-0" border>
      <TabsList className="mb-4 h-fit">
        <TabsTrigger
          value="friends"
          onClick={() => navigate(`${pathname}?activeTab=friends`)}
        >
          <span className="font-semibold">Friends</span>
        </TabsTrigger>
        <TabsTrigger
          value="posts"
          onClick={() => navigate(`${pathname}?activeTab=posts`)}
        >
          <span className="font-semibold">Posts</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="friends" className="h-full">
        <FriendsTab userId={profile.id} />
      </TabsContent>
      <TabsContent value="posts" className="">
        <PostsTab />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileTabs;
