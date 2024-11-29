import { Avatar, AvatarImage, Box, Stack } from '@social-media/evoke-ui';
import { IoMdMail } from 'react-icons/io';
import ProfileFriendsCount from './ProfileFriendsCount';
import { UserProfile } from '@social-media/api';
import EditProfileButton from './EditProfileButton';
import { useStore } from '@social-media/utils';
import FriendStatusButton from './FriendStatusButton';
import ProfileInfoSkeleton from './ProfileInfoSkeleton';
import LogoutButton from './LogoutButton';
import MutualFriendList from './MutualFriendList';

type ProfileInfoProps = {
  profile: UserProfile;
  isOwner: boolean;
};

const ProfileInfo: React.FC<ProfileInfoProps> = ({ profile, isOwner }) => {
  // Get the current user data from the store
  const { user } = useStore();

  if (!user) {
    return <ProfileInfoSkeleton />;
  }

  return (
    <Stack direction="column" spacing="small">
      {/* Profile Information */}
      <Stack
        direction="row"
        spacing={{ xs: 'medium', sm: 'large' }}
        className="w-full"
      >
        <Stack align="center" justify="center" className="w-fit">
          <Avatar className="xs:h-20 xs:w-20 sm:h-28 sm:w-28">
            <AvatarImage
              alt={profile.name}
              className="ring-0"
              src={profile.profilePicture}
            />
          </Avatar>
        </Stack>

        <Stack direction="column" spacing="small" className="w-full">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing="medium"
            align={{ xs: 'start', sm: 'center' }}
            justify="between"
          >
            <p className="font-secondary text-xl sm:text-2xl font-bold">
              {profile.name}
            </p>

            <Box className="hidden sm:flex">
              {isOwner ? (
                <Stack spacing="small">
                  <EditProfileButton />
                  <LogoutButton />
                </Stack>
              ) : (
                <FriendStatusButton userId={user.id} friendId={profile.id} />
              )}
            </Box>
          </Stack>
          <Stack direction="column" spacing="small">
            <ProfileFriendsCount userId={profile.id} />
            <div className="flex gap-2 items-center">
              <IoMdMail className="h-4 w-4 sm:h-5 sm:w-5" />
              <p className="text-sm sm:text-lg font-medium">{profile.email}</p>
            </div>
            <p className="text-sm sm:text-lg text-light-silverSteel dark:text-dark-silverSteel text-wrap">
              {profile.bio}
            </p>
          </Stack>
        </Stack>
      </Stack>

      {/* Mutual Friends - only displayed if the user is not the profile owner */}
      {!isOwner && (
        <MutualFriendList userProfile={profile} ownerProfile={user} />
      )}

      {/* Buttons for mobile screen */}
      <Box className="flex sm:hidden w-full">
        {isOwner ? (
          <Stack spacing="small" className="w-full" justify="evenly">
            <EditProfileButton />
            <LogoutButton />
          </Stack>
        ) : (
          <FriendStatusButton userId={user.id} friendId={profile.id} />
        )}
      </Box>
    </Stack>
  );
};

export default ProfileInfo;
