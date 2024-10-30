import { Grid, Stack } from '@social-media/evoke-ui';
import FriendsCard from './FriendsCard';
import { useFriends } from '@social-media/api';
import { LiaUserFriendsSolid } from 'react-icons/lia';

const FriendsTab: React.FC<{ userId: string }> = ({ userId }) => {
  const { data: friendDetails } = useFriends(userId);

  return (
    <>
      {friendDetails?.friends.length === 0 ? (
        <Stack
          align="center"
          justify="center"
          direction="column"
          spacing="xlarge"
          className="text-center h-full border border-light-silverSteel/90 dark:border-dark-silverSteel/50 text-light-silverSteel/50 dark:text-dark-silverSteel/50 rounded-md p-4"
        >
          <LiaUserFriendsSolid className="w-20 h-20" />
          <div>
            <h1 className="font-secondary font-medium text-2xl mb-2">
              No friends
            </h1>
            <p className="font-medium text-lg">
              Looks like you haven't added any friends. Add some to get started
            </p>
          </div>
        </Stack>
      ) : (
        <Grid
          spacing={'medium'}
          columns={{ sm: 1, md: 2 }}
          columnSpacing={'medium'}
          className="overflow-auto"
        >
          {friendDetails?.friends.map((friend) => {
            return <FriendsCard key={friend.id} friend={friend} />;
          })}
        </Grid>
      )}
    </>
  );
};

export default FriendsTab;
