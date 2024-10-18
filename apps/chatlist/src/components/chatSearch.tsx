import { LuSearch } from 'react-icons/lu';
import { FaPlus } from 'react-icons/fa6';
import { Box, Button, Input } from '@social-media/evoke-ui';
import { useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { User } from '@social-media/api';

interface ChatSearchProps {
  setData: React.Dispatch<React.SetStateAction<User[]>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChatSearch: React.FC<ChatSearchProps> = ({
  // setData,
  setIsModalOpen,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    console.log(debouncedSearchTerm);
  };

  return (
    <Box className="flex gap-4 items-center py-2">
      <Box className="w-full">
        <Input
          type="text"
          name="search"
          value={searchTerm}
          onChange={handleChange}
        >
          <LuSearch />
        </Input>
      </Box>
      <Button
        size="icon"
        variant={'ghost'}
        type="button"
        onClick={() => setIsModalOpen((prev) => !prev)}
      >
        <FaPlus className="dark:fill-dark-secondary text-xl fill-light-secondary" />
      </Button>
    </Box>
  );
};
