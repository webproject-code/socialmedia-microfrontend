import { Stack } from '@social-media/evoke-ui';
import { IoIosWarning, IoMdCheckmarkCircle } from 'react-icons/io';

type StatusMessageBoxProps = {
  status: 'success' | 'error';
  statusMessage: string;
};

export const StatusMessageBox: React.FC<StatusMessageBoxProps> = ({
  status,
  statusMessage,
}) => {
  return (
    <Stack
      align={'center'}
      spacing={'small'}
      className={`p-2 rounded-md border ${
        status === 'error'
          ? 'border-red-600 dark:border-red-400 bg-red-300/50 dark:bg-red-700/50 text-red-600 dark:text-red-400'
          : 'border-green-600 dark:border-green-400 bg-green-300/50 dark:bg-green-700/50 text-green-600 dark:text-green-400'
      }`}
    >
      {status === 'error' ? <IoIosWarning /> : <IoMdCheckmarkCircle />}
      <p>{statusMessage}</p>
    </Stack>
  );
};
