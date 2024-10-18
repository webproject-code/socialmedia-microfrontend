import React from 'react';
import { Grid } from '@social-media/evoke-ui';
import '@social-media/evoke-ui/dist/styles.css';
import ProfileAvatar from './ProfileAvatar';
import ProfileFriendsInfo from './ProfileFriendsInfo';
import ProfileTabs from './ProfileTabs';

const Profile: React.FC = () => {
  return (
    <>
      <Grid
        columns={12}
        rows={12}
        spacing={'none'}
        className="bg-light-primary dark:bg-dark-primary h-[100vh] w-[100vw]"
      >
        <Grid.GridItem rowSpan={3} columnSpan={6}>
          <ProfileAvatar />
        </Grid.GridItem>
        <Grid.GridItem rowSpan={3} columnSpan={6}>
          <ProfileFriendsInfo />
        </Grid.GridItem>
        <Grid.GridItem rowSpan={9} columnSpan={12}>
          <ProfileTabs />
        </Grid.GridItem>
      </Grid>
    </>
  );
};

export default Profile;
