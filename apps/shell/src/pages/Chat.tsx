import TopbarForMobile from '../components/TopbarForMobile';

type ChatProps = {};

const Chat: React.FC<ChatProps> = () => {
  return (
    <div>
      <TopbarForMobile title="Messages" />
      Chat
    </div>
  );
};

export default Chat;
