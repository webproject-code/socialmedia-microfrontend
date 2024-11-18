import { Box, Skeleton, Stack } from '@social-media/evoke-ui';

const ProfileInfoSkeleton = () => {
  return (
    <Stack direction="column" spacing="medium">
      <Stack align="center" spacing={{ xs: 'medium', sm: 'large' }}>
        <Stack direction="row" spacing={{ xs: 'medium', sm: 'large' }}>
          <Skeleton
            variant="circular"
            className="w-fit xs:h-20 xs:w-20 sm:h-28 sm:w-28"
          />
        </Stack>
        <Stack direction="column" spacing="small" className="w-full">
          {/* Name and Action Button Skeleton */}
          <Stack
            spacing="medium"
            align={{ sm: 'center' }}
            direction={{ xs: 'column', sm: 'row' }}
          >
            <Skeleton variant="text" width="120px" height="24px" />
            <Box className="hidden sm:flex">
              <Stack spacing="small">
                <Skeleton variant="rectangular" width="100px" height="36px" />
                <Skeleton variant="rectangular" width="100px" height="36px" />
              </Stack>
            </Box>
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
      </Stack>
      <Skeleton variant="text" width="80%" height="24px" />
    </Stack>
  );
};

export default ProfileInfoSkeleton;
