import { Stack } from '@social-media/evoke-ui';

type ProfileFriendsCountProps = {
  friendsCount: number;
};

const ProfileFriendsCount: React.FC<ProfileFriendsCountProps> = ({
  friendsCount,
}) => {
  return (
    <Stack
      align="center"
      className="gap-2 w-full text-light-secondary dark:text-dark-secondary"
    >
      <p className=" font-bold xs:text-base sm:text-xl">{friendsCount}</p>
      <p className="font-semibold xs:text-base sm:text-xl">Friends</p>
    </Stack>
  );
};

export default ProfileFriendsCount;
