import { Skeleton } from '@social-media/evoke-ui';

interface FriendsListCardSkeletonProps {
  cardType: 'request' | 'add' | 'search';
  count?: number;
}

const FriendsListCardSkeleton: React.FC<FriendsListCardSkeletonProps> = ({
  cardType,
  count = 10, // Default to 5 skeleton cards
}) => {
  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={`skeleton-${index}`} className="rounded-lg">
            <div className="flex py-2 sm:py-3 px-1 items-center justify-between gap-4">
              <div className="flex gap-3 items-center h-full">
                <Skeleton variant="circular" className="w-11 h-11" />
                <Skeleton className="h-4 w-28 sm:w-36" />
              </div>
              <div>
                {cardType === 'request' ? (
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-9 sm:w-28 rounded-md" />
                    <Skeleton className="h-9 w-9 sm:w-28 rounded-md" />
                  </div>
                ) : (
                  cardType === 'add' && (
                    <Skeleton className="h-9 w-9 sm:w-40 rounded-md" />
                  )
                )}
              </div>
            </div>
            <div className="border-b dark:border-dark-silverSteel border-light-silverSteel opacity-15" />
          </div>
        ))}
    </>
  );
};

export default FriendsListCardSkeleton;
