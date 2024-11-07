import { Stack } from '@social-media/evoke-ui';
import { BsFilePostFill } from 'react-icons/bs';

const PostsTab = () => {
  return (
    <Stack
      align="center"
      justify="center"
      direction="column"
      spacing="xlarge"
      className="text-center h-full border  border-light-silverSteel/90 dark:border-dark-silverSteel/50 text-light-silverSteel/50 dark:text-dark-silverSteel/50 rounded-md p-4"
    >
      <BsFilePostFill className="w-20 h-20" />
      <div>
        <h1 className="font-secondary font-medium text-2xl mb-2">No Posts</h1>
        <p className="font-medium text-lg">
          Nothing here yet. Share something to get started!
        </p>
      </div>
    </Stack>
  );
};

export default PostsTab;
