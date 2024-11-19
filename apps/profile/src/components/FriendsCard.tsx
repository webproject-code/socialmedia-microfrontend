import { Friend } from '@social-media/api';
import { Stack } from '@social-media/evoke-ui';

import { useNavigate } from 'react-router-dom';

type FriendsCardProps = {
  friend: Friend;
};

const FriendsCard: React.FC<FriendsCardProps> = ({ friend }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/users/${friend.id}`);
  };

  return (
    <Stack
      align="center"
      justify="between"
      className="w-full border-2 border-light-silverSteel/10 dark:border-dark-silverSteel/10  rounded-md cursor-pointer dark:hover:bg-dark-modalColor/20 hover:bg-light-modalColor focus-ring outline-0"
      tabIndex={0}
    >
      <div
        className="flex gap-4 items-center w-full cursor-pointer p-2 sm:p-4"
        onClick={handleClick}
      >
        <img
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-full"
          src={friend.profilePicture}
          alt="profile"
        />
        <div className="flex flex-col">
          <h6 className="text-base md:text-md">{friend.name}</h6>
          <p className="text-sm text-slate-600 dark:text-silverSteel">
            {friend.email}
          </p>
        </div>
      </div>
    </Stack>
  );
};

export default FriendsCard;
