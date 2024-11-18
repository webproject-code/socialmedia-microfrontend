import { LuSearch } from 'react-icons/lu';
import { useEffect } from 'react';

import { Box, Input } from '@social-media/evoke-ui';

import useDebounce from '../hooks/useDebounce';

interface FriendSearchProps {
  onSearch: (searchTerm: string) => void;
  searchTerm: string;
}

export const FriendSearch: React.FC<FriendSearchProps> = ({
  onSearch,
  searchTerm,
}) => {
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <Box role="search" className="flex gap-4 items-center py-2 mx-1">
      <Box className="w-full focus-within:ring-2 focus-within:ring-primary rounded-md">
        <Input
          type="text"
          name="search"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search users by name"
          aria-label="Search users"
          aria-describedby="search-description"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              onSearch('');
            }
          }}
          autoComplete="off"
        >
          <LuSearch aria-hidden="true" />
        </Input>
      </Box>
    </Box>
  );
};
