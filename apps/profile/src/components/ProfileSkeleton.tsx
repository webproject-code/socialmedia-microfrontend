import { Box, Grid, Skeleton, Stack } from '@social-media/evoke-ui';
import FriendsListSkeleton from './FriendsListSkeleton';
import ProfileInfoSkeleton from './ProfileInfoSkeleton';

const ProfileSkeleton = () => {
  return (
    <Box className="bg-light-primary dark:bg-dark-primary dark:text-white max-h-auto min-h-screen w-screen p-4 sm:p-10 ">
      <Grid columns={12} spacing="large">
        <ProfileInfoSkeleton />
        <Grid.GridItem columnSpan={12} className="h-full">
          <Stack direction="column" spacing="large" className="px-2">
            <Stack spacing="medium">
              <Skeleton variant="rectangular" width="100px" height="40px" />
              <Skeleton variant="rectangular" width="100px" height="40px" />
            </Stack>
            <FriendsListSkeleton />
          </Stack>
        </Grid.GridItem>
      </Grid>
    </Box>
  );
};

export default ProfileSkeleton;
