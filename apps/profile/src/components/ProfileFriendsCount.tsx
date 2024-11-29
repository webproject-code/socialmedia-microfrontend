import { useFriends } from '@social-media/api';
import { Stack } from '@social-media/evoke-ui';

type ProfileFriendsCountProps = {
  userId: string;
};

const ProfileFriendsCount: React.FC<ProfileFriendsCountProps> = ({
  userId,
}) => {
  const { totalCount } = useFriends(userId);

  return (
    <Stack
      align="center"
      className="gap-2 w-full text-light-secondary dark:text-dark-secondary"
    >
      <p className=" font-bold xs:text-base sm:text-xl">{totalCount}</p>
      <p className="font-semibold xs:text-base sm:text-xl">Friends</p>
    </Stack>
  );
};

export default ProfileFriendsCount;
