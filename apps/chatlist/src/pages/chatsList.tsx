import { Box, Container } from '@social-media/evoke-ui';
import { DarkModeToggle } from '../components/darkToggleButton';
import { ChatCardList } from '../components/chatCardList';

export const ChatsList = () => {
  return (
    <Container>
      <DarkModeToggle />
      <Box className="p-2">
        <ChatCardList />
      </Box>
    </Container>
  );
};
