import { User, UserProfile, useMutualFriends } from '@social-media/api';
import { Skeleton, Stack } from '@social-media/evoke-ui';
import { Link } from 'react-router-dom';

type MutualFriendListProps = {
  userProfile: UserProfile;
  ownerProfile: User;
};

const MutualFriendList: React.FC<MutualFriendListProps> = ({
  userProfile,
  ownerProfile,
}) => {
  const { data, isPending } = useMutualFriends(ownerProfile.id, userProfile.id);

  if (isPending || !data)
    return <Skeleton variant="text" width="80%" height="24px" />;

  const AvatarGroup: React.FC<{
    friends: Array<{ id: string; profilePicture: string; name: string }>;
  }> = ({ friends }) => {
    return (
      <div className="flex -space-x-2">
        {friends.slice(0, 3).map((friend) => (
          <img
            key={friend.id}
            src={friend.profilePicture}
            alt={`${friend.name}'s avatar`}
            className="xs:w-8 xs:h-8 md:w-10 md:h-10 rounded-full border-2 border-white dark:border-dark-primary"
          />
        ))}
      </div>
    );
  };

  if (data.mutualFriends.length === 0) return null;

  return (
    <Stack spacing="small" align="center" className="w-full">
      <AvatarGroup friends={data.mutualFriends} />
      <p>
        <span className="me-1">Followed By</span>
        <span className="text-light-secondary dark:text-dark-secondary ">
          {data.mutualFriends.map((friend) => {
            return (
              <span key={friend.id}>
                <Link to={`/users/${friend.id}`} className="font-semibold">
                  {friend.name}
                </Link>
              </span>
            );
          })}
          {data.mutualFriends.length > 3 && (
            <span className="font-semibold">
              +{data.mutualFriends.length - 3} more
            </span>
          )}
        </span>
      </p>
    </Stack>
  );
};

export default MutualFriendList;
