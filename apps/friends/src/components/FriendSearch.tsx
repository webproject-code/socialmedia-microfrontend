import { LuSearch } from 'react-icons/lu';
import { useEffect, useState } from 'react';

import { Box, Input } from '@social-media/evoke-ui';

import useDebounce from '../hooks/useDebounce';

interface FriendSearchProps {
  onSearch: (searchTerm: string) => void;
}

export const FriendSearch: React.FC<FriendSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <Box className="flex gap-4 items-center py-2">
      <Box className="w-full">
        <Input
          type="text"
          name="search"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search users by name"
        >
          <LuSearch />
        </Input>
      </Box>
    </Box>
  );
};
