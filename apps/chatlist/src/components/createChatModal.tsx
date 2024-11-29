import { Box, Button, Input, Modal } from '@social-media/evoke-ui';
import { Spinner, useDebounce, useTheme } from '@social-media/utils';
import { useCreateOneOnOneChat, useFriendsWithNoChat } from '@social-media/api';
import { useCallback, useState } from 'react';
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6';
import { LuSearch } from 'react-icons/lu';
import { RxCross2 } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

import { CreateGroupChatForm } from './forms/createGroupChatForm';
import { FriendCard } from './friendCard';
import { FriendListSkeleton } from './chatListSkeleton';

interface CreateChatModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentUserId: string;
}

export const CreateChatModal: React.FC<CreateChatModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  currentUserId,
}) => {
  const [groupChat, setGroupChat] = useState(false);
  const [memberIds, setMemberIds] = useState<{ id: string; name: string }[]>(
    []
  );
  const [groupChatStep, setGroupChatStep] = useState(0);
  const { isDarkTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { friends, isLoading, isFetchingNextPage, bottomRef } =
    useFriendsWithNoChat(debouncedSearchTerm, currentUserId);
  const navigate = useNavigate();
  const { mutate } = useCreateOneOnOneChat();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  const OneOnOneClickHandle = (id: string) => {
    mutate(
      { initiatorId: currentUserId, participantId: id },
      {
        onSuccess: (data) => {
          setIsModalOpen(false);
          navigate(`/chats/one-on-one/${data.id}`);
        },
      }
    );
  };

  const GroupClickHandle = (id: string, name: string) => {
    setMemberIds((prev) => {
      if (prev.some((member) => member.id === id)) {
        return prev.filter((member) => member.id !== id);
      }
      return [...prev, { id, name }];
    });
  };

  const handleCardClick = (id: string, name: string) => {
    if (groupChat) {
      return GroupClickHandle(id, name);
    } else {
      return OneOnOneClickHandle(id);
    }
  };

  const handleGroupChatNextStep = () => {
    setGroupChatStep(groupChatStep + 1);
  };
  const handleGroupChatPrevStep = () => {
    setGroupChatStep(groupChatStep - 1);
  };

  const removeMember = (id: string) => {
    setMemberIds((prevList) => prevList.filter((member) => member.id !== id));
  };

  const onGroupChatCancel = () => {
    setGroupChat(!groupChat);
    handleGroupChatPrevStep();
    setMemberIds([]);
  };

  return (
    <Modal
      closeOnOutsideClick
      onClose={() => setIsModalOpen(false)}
      showCross
      size="lg"
      className=""
      scrollBehaviour
      isOpen={isModalOpen}
      tabIndex={0}
    >
      <div className="bg-white dark:bg-gray-900 rounded-sm shadow-xl max-w-2xl w-full mx-auto">
        {/* <Modal.Header> */}
        <div className="border-b border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-light-secondary dark:text-dark-lavender">
              {groupChat ? 'Create Group Chat' : 'New Chat'}
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-light-silverSteel/50 hover:text-light-silverSteel dark:text-dark-silverSteel/50 dark:hover:text-dark-silverSteel"
            >
              <RxCross2 className="w-5 h-5" />
            </button>
          </div>
        </div>
        {/* </Modal.Header> */}
        <Modal.Content className="h-96">
          <div className="p-4">
            {!groupChat && (
              <Button
                onClick={() => {
                  setGroupChat(!groupChat);
                  setMemberIds([]);
                }}
                className="dark:text-dark-primary dark:bg-dark-secondary focus-visible:ring-2
      focus-visible:ring-light-secondary
      focus-visible:ring-offset-2
      dark:focus-visible:ring-dark-secondary
      dark:focus-visible:ring-offset-dark-primary
      outline-none"
                variant={'solid'}
              >
                Create Group
              </Button>
            )}

            {groupChat && groupChatStep === 1 && (
              <button
                className="cursor-pointer text-light-secondary dark:text-dark-secondary "
                aria-label="previous step"
                onClick={handleGroupChatPrevStep}
              >
                <FaCircleArrowLeft className="  w-6 h-6 " />
              </button>
            )}

            {/* show selected group members */}
            {groupChat && groupChatStep === 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {memberIds.length === 0
                      ? 'Select Members'
                      : `${memberIds.length} selected`}
                  </span>

                  <button
                    className="text-light-secondary dark:text-dark-secondary  disabled:text-light-silverSteel disabled:dark:text-dark-silverSteel disabled:cursor-not-allowed"
                    disabled={memberIds.length === 0}
                    aria-label="next step"
                    onClick={handleGroupChatNextStep}
                  >
                    <FaCircleArrowRight className="w-6 h-6" />
                  </button>
                </div>

                {memberIds.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {memberIds.map((member) => (
                      <div
                        key={member.id}
                        className="group font-primary flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full text-sm"
                      >
                        <span>{member.name}</span>
                        <button
                          type="button"
                          onClick={() => removeMember(member.id)}
                          className="opacity-60 hover:opacity-100 transition-opacity"
                          aria-label={`Remove ${member.name}`}
                        >
                          <RxCross2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {groupChat && groupChatStep === 1 && (
              <CreateGroupChatForm
                ownerId={currentUserId}
                memberList={memberIds}
                setMemberList={setMemberIds}
                onCancel={onGroupChatCancel}
                closeModal={setIsModalOpen}
              />
            )}

            {groupChatStep === 0 && (
              <>
                <div className="relative my-2 mt-6">
                  <Input
                    type="text"
                    name="search"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder={'Search Here...'}
                    aria-label="Search chats"
                  >
                    <LuSearch />
                  </Input>
                </div>

                <div className="mt-4">
                  {isLoading ? (
                    <Box className="flex flex-col h-full w-full px-2">
                      <FriendListSkeleton />
                    </Box>
                  ) : friends?.length === 0 ? (
                    <Box className="flex justify-center items-center flex-col text-light-silverSteel/50 dark:text-dark-silverSteel/50">
                      <img
                        src={
                          isDarkTheme
                            ? 'assets/Images/dark-no-results-found-image.svg'
                            : 'assets/Images/light-no-results-found-image.svg'
                        }
                        width={300}
                        height={300}
                        alt="search not found"
                        className="object-fill h-[60%] w-[60%]"
                      />
                      <p className="font-primary">No User found !</p>
                    </Box>
                  ) : (
                    <div className="space-y-1">
                      {friends.map((user) => {
                        // Check if user is selected as a group member
                        const isMemberSelected = memberIds.some(
                          (member) => member.id === user.id
                        );
                        return (
                          <FriendCard
                            selectedMember={isMemberSelected}
                            key={user.id}
                            name={user.name}
                            email={user.email}
                            profilePicture={user.profilePicture}
                            onClickHandler={() =>
                              handleCardClick(user.id, user.name)
                            }
                            groupChat={groupChat}
                          />
                        );
                      })}
                      <div ref={bottomRef}>
                        {isFetchingNextPage && (
                          <div className="flex justify-center items-center py-4">
                            <Spinner />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </Modal.Content>
      </div>
    </Modal>
  );
};
