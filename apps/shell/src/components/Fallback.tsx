import { Spinner } from '@social-media/utils';

const Fallback = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-light-primary dark:bg-dark-primary">
      <Spinner />
    </div>
  );
};

export default Fallback;
