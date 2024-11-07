import { Button, Stack } from '@social-media/evoke-ui';
import { useStore } from '../store/store';
import { useLogout } from '@social-media/api';

const UserProfileCard: React.FC = () => {
  const { user, logout } = useStore();
  const { mutate } = useLogout();
  const onClickHandler = () => {
    mutate(undefined, {
      onSuccess: () => {
        logout();
      },
    });
  };

  return (
    <Stack direction="column" spacing="huge">
      <Stack justify="center" align="center" className="w-full h-full">
        <img
          src={user?.profilePicture}
          alt="user-profile"
          className="object-cover rounded-full w-24 h-24"
        />
      </Stack>
      <Stack align="center" direction="column" spacing="medium">
        <h3 className="text-2xl font-semibold">{user?.name}</h3>
        <h5 className="text-gray-500">{user?.bio}</h5>
        <Button className="w-fit" onClick={onClickHandler}>
          Logout
        </Button>
      </Stack>
    </Stack>
  );
};

export default UserProfileCard;
