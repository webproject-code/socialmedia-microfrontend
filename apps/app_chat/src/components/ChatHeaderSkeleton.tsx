import { Box, Skeleton, Stack } from '@social-media/evoke-ui';

const ChatHeaderSkeleton = () => {
  return (
    <Stack
      direction="row"
      className="py-3 px-2 md:px-4 justify-between shadow-md w-full h-[72px] items-center"
    >
      <Skeleton variant="circular" className="h-7 w-7 md:h-9 md:w-9" />
      <Stack direction="column" className="flex-grow ml-4 gap-1">
        <Skeleton variant="text" width="150px" height="20px" />
        <Skeleton variant="text" width="100px" height="16px" />
      </Stack>
      <Box>
        <Skeleton variant="rectangular" width="16px" height="16px" />
      </Box>
    </Stack>
  );
};

export default ChatHeaderSkeleton;
