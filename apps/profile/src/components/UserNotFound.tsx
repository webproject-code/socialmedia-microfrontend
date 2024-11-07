import { Button, Stack } from '@social-media/evoke-ui';
import { FaUserSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserNotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Goes back to the previous page
  };

  return (
    <Stack
      direction="column"
      align="center"
      justify="center"
      className="bg-light-primary dark:bg-dark-primary min-h-screen w-screen p-4 md:p-10 max-w-4xl mx-auto text-light-silverSteel dark:text-dark-silverSteel"
    >
      <FaUserSlash className=" w-24 h-24 mb-4" />
      <h1 className="font-secondary text-2xl md:text-3xl font-semibold mb-2">
        User Not Found
      </h1>
      <p>
        Sorry, the user you are looking for does not exist or has been removed.
      </p>
      <Button onClick={handleGoBack} className="w-fit mt-4">
        Go Back
      </Button>
    </Stack>
  );
};

export default UserNotFound;
