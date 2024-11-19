import { Skeleton, Stack } from '@social-media/evoke-ui';
import React from 'react';

const MessageInputSkeleton = () => {
  return (
    <div className="w-full sticky bottom-0 bg-light-primary dark:bg-dark-primary px-5 py-4">
      <Stack
        direction="row"
        className="gap-2 items-center w-full justify-center"
      >
        <Skeleton variant="text" height="40px" className="flex-1" />
        <Skeleton variant="text" width="56px" height="40px" />
      </Stack>
    </div>
  );
};

export default MessageInputSkeleton;
