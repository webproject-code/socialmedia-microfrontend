import { Skeleton, Stack } from '@social-media/evoke-ui';

const ProfileInfoSkeleton = () => {
  return (
    <Stack align="center" spacing="xxlarge">
      <Stack align="center" justify="center">
        <Skeleton variant="circular" width="100px" height="100px" />
      </Stack>
      <Stack direction="column" spacing="large" className="w-full">
        {/* Name and Action Button Skeleton */}
        <Stack
          spacing="medium"
          align={{ sm: 'center' }}
          direction={{ xs: 'column', sm: 'row' }}
        >
          <Skeleton variant="text" width="120px" height="24px" />
          <Stack spacing="small">
            <Skeleton variant="rectangular" width="100px" height="36px" />
            <Skeleton variant="rectangular" width="100px" height="36px" />
          </Stack>
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
  );
};

export default ProfileInfoSkeleton;
