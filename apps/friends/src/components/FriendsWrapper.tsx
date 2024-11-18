import { Box } from '@social-media/evoke-ui';
import { Friends } from '../remote-entry';

const FriendsWrapper: React.FC = () => {
  return (
    <Box className="w-screen h-screen">
      <Friends />
    </Box>
  );
};

export default FriendsWrapper;
