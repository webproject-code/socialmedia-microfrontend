import { Avatar, AvatarImage, Stack } from '@social-media/evoke-ui';
import { IoMdMail } from 'react-icons/io';
import ProfileFriendsCount from './ProfileFriendsCount';
import { UserProfile } from '@social-media/api';
import EditProfileButton from './EditProfileButton';
import { useStore } from '@social-media/utils';
import FriendStatusButton from './FriendStatusButton';
import ProfileInfoSkeleton from './ProfileInfoSkeleton';

const ProfileInfo: React.FC<{ profile: UserProfile; isOwner: boolean }> = ({
  profile,
  isOwner,
}) => {
  const { user } = useStore();

  if (!user) {
    return <ProfileInfoSkeleton />;
  }
  return (
    <Stack spacing="xxlarge" className="w-full">
      {/* Profile Picture */}
      <Stack align="center" justify="center">
        <Avatar className="xs:h-20 xs:w-20 sm:h-28 sm:w-28 flex items-center">
          <AvatarImage
            alt={profile.name}
            className="ring-0"
            src={profile.profilePicture}
          />
        </Avatar>
      </Stack>

      {/* Profile Details */}
      <Stack direction="column" spacing="medium">
        <Stack
          spacing="medium"
          align={{ xs: 'start', sm: 'center' }}
          direction={{ xs: 'column', sm: 'row' }}
        >
          <p className="font-secondary text-xl sm:text-2xl font-bold">
            {profile.name}
          </p>
          {/* Edit Profile Button */}
          {isOwner ? (
            <EditProfileButton ownerProfile={profile} />
          ) : (
            <FriendStatusButton userId={user.id} friendId={profile.id} />
          )}
        </Stack>
        <Stack direction="column" spacing="small">
          <ProfileFriendsCount
            friendsCount={profile.friendIds.length + profile.friendOfIds.length}
          />
          <div className="flex gap-2 items-center">
            <IoMdMail className="h-4 w-4 sm:h-5 md:w-5" />
            <p className="text-sm sm:text-lg font-medium">{profile.email}</p>
          </div>
          <p className="text-sm sm:text-lg text-light-silverSteel dark:text-dark-silverSteel">
            {profile.bio}
          </p>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProfileInfo;
