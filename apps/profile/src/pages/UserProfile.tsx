import { useUser } from '@social-media/api';
import { Stack } from '@social-media/evoke-ui';
import UserNotFound from '../components/UserNotFound';
import { useParams } from 'react-router-dom';
import ProfileInfo from '../components/ProfileInfo';
import { useStore } from '@social-media/utils';
import ProfileTabs from '../components/ProfileTabs';
import ProfileSkeleton from '../components/ProfileSkeleton';

const UserProfile = () => {
  // Get the user id from the URL params
  const { id } = useParams();

  // Fetch the visited user data using the `useUser` hook
  const { data: visitedUser, isLoading, isError } = useUser(id ?? '');

  // Get the user data from the store
  const { user } = useStore();

  if (isLoading) return <ProfileSkeleton />;

  if (isError || !visitedUser) return <UserNotFound />;

  // Check if the current user is the owner of the profile
  const isOwner = user?.id === visitedUser?.id;

  return (
    <Stack direction="column" spacing="medium" className="h-full w-full">
      <ProfileInfo profile={visitedUser} isOwner={isOwner} />
      <ProfileTabs profile={visitedUser} />
    </Stack>
  );
};

export default UserProfile;
