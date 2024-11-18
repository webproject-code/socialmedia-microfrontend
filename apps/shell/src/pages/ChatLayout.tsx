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
      <Grid className="w-full h-full p-1" columns={12} spacing="small">
        <Grid.GridItem
          columnSpan={{ xs: 12, md: 4, lg: 3 }}
          className="overflow-hidden md:block"
        >
          <div
            className={`h-full sticky top-0 xs:${
              isAnyChatSelected && 'hidden'
            } md:block`}
          >
            <ChatsList />
          </div>
        </Grid.GridItem>
        <Grid.GridItem
          columnSpan={{ xs: 12, md: 8, lg: 9 }}
          className="h-full overflow-auto"
        >
          {isAnyChatSelected ? <Outlet /> : <NoChatSelected />}
        </Grid.GridItem>
      </Grid>
    </SocketProvider>
  );
};

export default ChatLayout;
