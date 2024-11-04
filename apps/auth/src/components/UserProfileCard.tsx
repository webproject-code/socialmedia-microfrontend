import { Button, Stack } from '@social-media/evoke-ui';
import { useStore } from '../store/store';

const UserProfileCard: React.FC = () => {
  const { user, logout } = useStore();
  return (
    <Stack direction="column" spacing="huge">
      <Stack justify="center">
        <img
          src={user?.profilePicture}
          alt="user-profile"
          width={96}
          height={96}
          className="rounded-full"
        />
      </Stack>
      <Stack align="center" direction="column" spacing="medium">
        <h3 className="text-2xl font-semibold">{user?.name}</h3>
        <h5 className="text-gray-500">{user?.bio}</h5>
        <Button className="w-fit" onClick={logout}>
          Logout
        </Button>
      </Stack>
    </Stack>
  );
};

export default UserProfileCard;
