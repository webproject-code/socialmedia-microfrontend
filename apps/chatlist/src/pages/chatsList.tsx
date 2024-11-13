import { Box, Container } from '@social-media/evoke-ui';
import { ChatCardList } from '../components/chatCardList';

export const ChatsList = () => {
  return (
    <Container>
      <Box className="p-0">
        <ChatCardList />
      </Box>
    </Container>
  );
};
