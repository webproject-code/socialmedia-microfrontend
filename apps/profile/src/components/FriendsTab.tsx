import { Box, Grid, Stack } from '@social-media/evoke-ui';
import FriendsCard from './FriendsCard';
import { useFriends } from '@social-media/api';
import { useTheme } from '@social-media/utils';
import FriendsListSkeleton from './FriendsListSkeleton';

type FriendsTabProps = {
  userId: string;
};

const FriendsTab: React.FC<FriendsTabProps> = ({ userId }) => {
  const { data: friendDetails } = useFriends(userId);
  const theme = useTheme();

  if (!friendDetails) {
    return <FriendsListSkeleton />;
  }

  return friendDetails.friends.length === 0 ? (
    <Stack
      align="center"
      justify="center"
      direction="column"
      className="text-center h-full text-light-silverSteel/50 dark:text-dark-silverSteel/50 rounded-md p-4"
    >
      <img
        src={`assets/images/${
          theme.isDarkTheme ? 'dark' : 'light'
        }-no-results-found-image.svg`}
        alt="logo"
        width={300}
        height={300}
        className="opacity-80"
      />
      <Box>
        <h1 className="font-secondary font-medium text-xl sm:text-2xl mb-2">
          No friends
        </h1>
        <p className="font-medium text-base sm:text-lg">
          Looks like you haven't added any friends. Add some to get started
        </p>
      </Box>
    </Stack>
  ) : (
    <Grid
      spacing={'medium'}
      columns={{ sm: 1, md: 2, lg: 3 }}
      columnSpacing={'medium'}
      className="overflow-auto"
    >
      {friendDetails.friends.map((friend) => {
        return <FriendsCard key={friend.id} friend={friend} />;
      })}
    </Grid>
  );
};

export default FriendsTab;
