import { Box, Grid, Skeleton, Stack } from '@social-media/evoke-ui';

const ProfileSkeleton = () => {
  return (
    <Box className="bg-light-primary dark:bg-dark-primary dark:text-white max-h-auto min-h-screen w-screen p-4 sm:p-10 max-w-4xl mx-auto">
      <Grid rows={12} columns={12} spacing="xxlarge">
        {/* Profile Picture Skeleton */}
        <Grid.GridItem
          columnSpan={3}
          rowSpan={3}
          className="flex justify-center"
        >
          <Stack align="center">
            <Skeleton variant="circular" width="100px" height="100px" />
          </Stack>
        </Grid.GridItem>

        {/* Profile Details Skeleton */}
        <Grid.GridItem columnSpan={9} rowSpan={3}>
          <Stack direction="column" spacing="large" className="w-full">
            {/* Name and Action Button Skeleton */}
            <Stack
              spacing="medium"
              align={{ sm: 'center' }}
              direction={{ xs: 'column', sm: 'row' }}
            >
              <Skeleton variant="text" width="120px" height="24px" />
              <Skeleton variant="rectangular" width="100px" height="36px" />
            </Stack>

            {/* Friends Count, Email, and Bio Skeleton */}
            <Stack direction="column" spacing="small" className="space-y-2">
              <Skeleton variant="text" width="150px" height="20px" />
              <Stack spacing="small" align="center">
                <Skeleton variant="circular" width="16px" height="16px" />
                <Skeleton variant="text" width="180px" height="20px" />
              </Stack>
              <Skeleton variant="text" width="90%" height="20px" />
            </Stack>
          </Stack>
        </Grid.GridItem>
        <Grid.GridItem columnSpan={12} rowSpan={8} className="h-full">
          <Stack direction="column" spacing="large">
            <Stack spacing="medium">
              <Skeleton variant="rectangular" width="100px" height="40px" />
              <Skeleton variant="rectangular" width="100px" height="40px" />
            </Stack>
            <Grid spacing="large" columns={{ xs: 1, sm: 2 }}>
              <Skeleton variant="rectangular" height="50px" />
              <Skeleton variant="rectangular" height="50px" />
              <Skeleton variant="rectangular" height="50px" />
              <Skeleton variant="rectangular" height="50px" />
              <Skeleton variant="rectangular" height="50px" />
              <Skeleton variant="rectangular" height="50px" />
              <Skeleton variant="rectangular" height="50px" />
              <Skeleton variant="rectangular" height="50px" />
              <Skeleton variant="rectangular" height="50px" />
            </Grid>
          </Stack>
        </Grid.GridItem>
      </Grid>
    </Box>
  );
};

export default ProfileSkeleton;
