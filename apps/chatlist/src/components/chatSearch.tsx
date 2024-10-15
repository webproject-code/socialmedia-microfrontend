import { LuSearch } from 'react-icons/lu';
import { FaPlus } from 'react-icons/fa6';
import { Box, Button, Input } from '@social-media/evoke-ui';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../api/axios.instance';
import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import { ChatCardMessage } from '../constant';

const fetchSearchResults = async (searchTerm: string) => {
  const response = await axiosInstance.get(`/users/`, {
    params: { q: searchTerm },
  });
  return response.data;
};

interface ChatSearchProps {
  setData: React.Dispatch<React.SetStateAction<ChatCardMessage[]>>;
}

export const ChatSearch: React.FC<ChatSearchProps> = ({ setData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data } = useQuery({
    queryKey: ['search', debouncedSearchTerm],
    queryFn: () => fetchSearchResults(debouncedSearchTerm),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  useEffect(() => {
    if (data?.data) {
      //   setData(data.data.users);
    }
  }, [data, setData]);

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
      <Button size="icon" variant={'ghost'} type="button">
        <FaPlus className="dark:fill-dark-secondary text-xl fill-light-secondary" />
      </Button>
    </Box>
  );
};
