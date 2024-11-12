import { Skeleton, Stack } from '@social-media/evoke-ui';
import FriendsListSkeleton from './FriendsListSkeleton';
import ProfileInfoSkeleton from './ProfileInfoSkeleton';

const ProfileSkeleton = () => {
  return (
    <Stack direction="column" spacing="xxlarge" className="w-full h-full">
      <ProfileInfoSkeleton />
      <Stack direction="column" spacing="large" className="px-2">
        <Stack spacing="medium">
          <Skeleton variant="rectangular" width="100px" height="40px" />
          <Skeleton variant="rectangular" width="100px" height="40px" />
        </Stack>
        <FriendsListSkeleton />
      </Stack>
    </Stack>
  );
};

export default ProfileSkeleton;
