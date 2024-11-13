import { Card, Divider, Skeleton } from '@social-media/evoke-ui';

export const ChatListSkeleton = () => {
  return (
    <div className="space-y-1">
      {[...Array(10)].map((_, index) => (
        <div key={index}>
          <Card className="bg-transparent">
            <Card.Content className="p-2 sm:p-3">
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                {/* Left side - Avatar and Text */}
                <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                  {/* Avatar skeleton */}
                  <div className="w-10 h-10 sm:w-7 sm:h-7 mr-2">
                    <Skeleton
                      variant="circular"
                      className="w-7 h-7 md:w-10 md:h-10"
                    />
                  </div>
                  {/* Text content skeleton */}
                  <div className="flex flex-col flex-1 gap-2">
                    {/* Name skeleton */}
                    <Skeleton
                      variant="text"
                      className="h-4 sm:h-5 w-24 sm:w-32"
                    />
                    {/* Message skeleton */}
                    <Skeleton
                      variant="text"
                      className="h-3 sm:h-4 w-40 sm:w-48"
                    />
                  </div>
                </div>
                {/* Right side - Time and Unread Count */}
                <div className="flex flex-col items-end gap-1 sm:gap-2">
                  {/* Time skeleton */}
                  <Skeleton variant="rectangular" className="h-3 sm:h-4 w-12" />
                  {/* Unread count skeleton */}
                  <Skeleton
                    variant="circular"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                  />
                </div>
              </div>
            </Card.Content>
          </Card>
          <Divider alignment="horizontal" className="my-1" />
        </div>
      ))}
    </div>
  );
};

export const FriendListSkeleton = () => {
  return (
    <div className="space-y-1">
      {[...Array(5)].map((_, index) => (
        <div key={index}>
          <Card className="bg-transparent">
            <Card.Content className="p-2 sm:p-3">
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                {/* Left side - Avatar and Text */}
                <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                  {/* Avatar skeleton */}
                  <Skeleton variant="circular" />
                  {/* Text content skeleton */}
                  <div className="flex flex-col flex-1 gap-2">
                    {/* Name skeleton */}
                    <Skeleton
                      variant="text"
                      className="h-4 sm:h-5 w-24 sm:w-32"
                    />
                    {/* Message skeleton */}
                    <Skeleton
                      variant="text"
                      className="h-3 sm:h-4 w-40 sm:w-48"
                    />
                  </div>
                </div>
                {/* Right side - Message button */}
                <div className="flex flex-col items-end gap-1 sm:gap-2">
                  <Skeleton variant="rectangular" className="h-7 w-7" />
                </div>
              </div>
            </Card.Content>
          </Card>
          <Divider alignment="horizontal" className="my-1" />
        </div>
      ))}
    </div>
  );
};
