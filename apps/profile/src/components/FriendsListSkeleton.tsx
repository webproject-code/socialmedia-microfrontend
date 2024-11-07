import { Grid, Skeleton } from '@social-media/evoke-ui';

const FriendsListSkeleton = () => {
  return (
    <Grid spacing="large" columns={{ xs: 1, md: 2, lg: 3 }}>
      <Skeleton variant="rectangular" height="50px" />
      <Skeleton variant="rectangular" height="50px" />
      <Skeleton variant="rectangular" height="50px" />
      <Skeleton variant="rectangular" height="50px" />
      <Skeleton variant="rectangular" height="50px" />
      <Skeleton variant="rectangular" height="50px" />
      <Skeleton variant="rectangular" height="50px" />
      <Skeleton variant="rectangular" height="50px" />
      <Skeleton variant="rectangular" height="50px" />
    </Grid>
  );
};

export default FriendsListSkeleton;
