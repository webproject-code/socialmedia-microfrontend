import { Skeleton, Stack } from '@social-media/evoke-ui';

const ChatWindowSkeleton = () => {
  return (
    <div className="flex-1 flex flex-col px-4 py-4 overflow-y-auto bg-gray-300 dark:bg-[#4C4D51]/20">
      {/* Message Loading Placeholder */}
      <Stack direction="column" className="gap-2">
        {/* Date label Skeleton */}
        <Skeleton
          variant="text"
          width="10%"
          height="25px"
          className="mx-auto"
        />
        {/* Message Bubbles */}
        <Skeleton
          width="40%"
          variant="text"
          height="25px"
          className="self-end"
        />
        <Skeleton
          width="40%"
          variant="text"
          height="35px"
          className="self-start"
        />
        <Skeleton
          width="20%"
          variant="text"
          height="25px"
          className="self-end"
        />
        <Skeleton
          width="40%"
          variant="text"
          height="50px"
          className="self-start"
        />
        <Skeleton
          width="40%"
          variant="text"
          height="50px"
          className="self-end"
        />
        <Skeleton
          width="30%"
          variant="text"
          height="25px"
          className="self-start"
        />
        <Skeleton
          width="40%"
          variant="text"
          height="35px"
          className="self-end"
        />
        <Skeleton
          width="40%"
          variant="text"
          height="35px"
          className="self-end"
        />
        <Skeleton
          width="30%"
          variant="text"
          height="25px"
          className="self-start"
        />
        <Skeleton
          width="40%"
          variant="text"
          height="50px"
          className="self-end"
        />
        <Skeleton
          width="40%"
          variant="text"
          height="35px"
          className="self-start"
        />
        <Skeleton
          width="20%"
          variant="text"
          height="25px"
          className="self-end"
        />
        <Skeleton
          width="40%"
          variant="text"
          height="25px"
          className="self-end"
        />
        <Skeleton
          width="40%"
          variant="text"
          height="50px"
          className="self-start"
        />
        <Skeleton
          width="40%"
          variant="text"
          height="50px"
          className="self-end"
        />
        <Skeleton
          width="40%"
          variant="text"
          height="60px"
          className="self-start"
        />
      </Stack>
    </div>
  );
};

export default ChatWindowSkeleton;
