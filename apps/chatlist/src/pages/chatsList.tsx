import { Box, Container } from '@social-media/evoke-ui';
import { DarkModeToggle } from '../components/darkToggleButton';
import { ChatListCard } from '../components/chatList';

export const ChatsList = () => {
  return (
    <Container>
      <DarkModeToggle />
      <Box className="p-2">
        <ChatListCard />
      </Box>
    </Container>
  );
};
