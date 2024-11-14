import { Box, Grid, ScrollArea, Stack } from '@social-media/evoke-ui';
import FriendsCard from './FriendsCard';
import { useFriends } from '@social-media/api';
import { Spinner, useTheme } from '@social-media/utils';
import FriendsListSkeleton from './FriendsListSkeleton';

type FriendsTabProps = {
  userId: string;
};

const FriendsTab: React.FC<FriendsTabProps> = ({ userId }) => {
  const { friends, bottomRef, isFetchingNextPage } = useFriends(userId);
  const theme = useTheme();
  if (!friends) {
    return <FriendsListSkeleton />;
  }

  return friends.length === 0 ? (
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
    <ScrollArea className="h-full">
      <Grid
        spacing={'medium'}
        columns={{ sm: 1, md: 2, lg: 3 }}
        columnSpacing={'medium'}
      >
        {friends.map((friend) => {
          return (
            <FriendsCard key={friend.id} friend={friend} userId={userId} />
          );
        })}
      </Grid>
      <div ref={bottomRef} className="flex justify-center">
        {isFetchingNextPage && <Spinner />}
      </div>
    </ScrollArea>
  );
};

export default FriendsTab;
