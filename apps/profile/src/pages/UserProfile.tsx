import { useUser } from '@social-media/api';
import { Stack } from '@social-media/evoke-ui';
import UserNotFound from '../components/UserNotFound';
import { useParams } from 'react-router-dom';
import ProfileInfo from '../components/ProfileInfo';
import { useStore } from '@social-media/utils';
import ProfileTabs from '../components/ProfileTabs';
import ProfileSkeleton from '../components/ProfileSkeleton';
import { useEffect } from 'react';

const UserProfile = () => {
  const { id } = useParams();
  const { data: visitedUser, isLoading, isError } = useUser(id ?? '');
  const { user, setVisitedUser } = useStore();

  // Update the Zustand store when `visitedUser` changes
  useEffect(() => {
    if (visitedUser) {
      setVisitedUser(visitedUser);
    }
  }, [visitedUser, setVisitedUser]);

  if (isLoading) return <ProfileSkeleton />;

  if (isError) return <UserNotFound />;

  const isOwner = user?.id === visitedUser?.id;

  return (
    <Stack direction="column" spacing="medium" className="h-full w-full">
      {visitedUser ? (
        <>
          <ProfileInfo profile={visitedUser} isOwner={isOwner} />
          <ProfileTabs profile={visitedUser} />
        </>
      ) : (
        <UserNotFound />
      )}
    </Stack>
  );
};

export default UserProfile;
