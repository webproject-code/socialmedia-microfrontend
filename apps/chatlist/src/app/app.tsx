import '../styles.css';
import { Box, Container } from '@social-media/evoke-ui';
import { DarkModeToggle } from '../components/darkToggleButton';
import { ChatListCard } from '../components/chatList';
import '@social-media/evoke-ui/dist/styles.css';

export function App() {
  return (
    <Container>
      <DarkModeToggle />
      <Box className="p-2">
        <ChatListCard />
      </Box>
    </Container>
  );
}

export default App;
