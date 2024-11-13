import { Friend, useFriends } from '@social-media/api';
import {
  Avatar,
  AvatarImage,
  Box,
  Button,
  Input,
  Modal,
  ScrollArea,
} from '@social-media/evoke-ui';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

interface AddMembersListProps {
  onAddMembers: (memberIds: string[]) => void;
  existingMemberIds: string[];
  currentUserId: string;
}

const AddMembersList: React.FC<AddMembersListProps> = ({
  onAddMembers,
  existingMemberIds,
  currentUserId,
}) => {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    friends,
    bottomRef,
    error,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useFriends(currentUserId, { query: searchQuery });

  const filteredFriends = friends.filter(
    (friend) =>
      !existingMemberIds.includes(friend.id) &&
      friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = () => {
    onAddMembers(selectedMembers);
  };

  return (
    <>
      <Box className="space-y-4">
        <Input
          type="text"
          name="friends search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        >
          <FaSearch />
        </Input>
        <Box className="max-h-full space-y-2">
          <ScrollArea className="max-h-full">
            {filteredFriends.map((friend) => (
              <label
                key={friend.id}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedMembers.includes(friend.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedMembers([...selectedMembers, friend.id]);
                    } else {
                      setSelectedMembers(
                        selectedMembers.filter((id) => id !== friend.id)
                      );
                    }
                  }}
                  className="rounded border-gray-300 dark:border-dark-lavender"
                />
                <Avatar className="h-7 w-7">
                  <AvatarImage src={friend.profilePicture} />
                </Avatar>
                <span className="dark:text-dark-lavender">{friend.name}</span>
              </label>
            ))}
          </ScrollArea>
        </Box>
      </Box>
      <Button
        onClick={handleSubmit}
        disabled={selectedMembers.length === 0}
        className="w-fit"
      >
        Add Selected ({selectedMembers.length})
      </Button>
    </>
  );
};

export default AddMembersList;
