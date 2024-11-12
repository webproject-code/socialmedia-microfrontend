import { SocketProvider } from '@social-media/utils';
import { Grid } from '@social-media/evoke-ui';
import { ChatsList } from 'chatlist/Module';
import { Outlet, useLocation } from 'react-router-dom';
import NoChatSelected from '../components/NoChatSelected';

const ChatLayout: React.FC = () => {
  const { pathname } = useLocation();

  const isAnyChatSelected = /(group|one-on-one)\/[a-f0-9]{24}/.test(pathname);

  return (
    <SocketProvider>
      <Grid className="w-full h-full" columns={12}>
        <Grid.GridItem columnSpan={3} className="overflow-hidden">
          <div className="h-full sticky top-0 overflow-y-auto">
            <ChatsList />
          </div>
        </Grid.GridItem>
        <Grid.GridItem columnSpan={9} className="h-full overflow-auto">
          {isAnyChatSelected ? <Outlet /> : <NoChatSelected />}
        </Grid.GridItem>
      </Grid>
    </SocketProvider>
  );
};

export default ChatLayout;
