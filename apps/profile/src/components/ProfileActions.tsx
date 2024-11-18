import { UserProfile } from '@social-media/api';
import { Button, Modal, Stack } from '@social-media/evoke-ui';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditUserForm from './EditUserForm';

const ProfileActions: React.FC<{ profile: UserProfile }> = ({ profile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const navigate = useNavigate();

  return (
    <>
      <Stack spacing="large" className="w-full">
        <Button size={'md'} onClick={openModal} className="w-full">
          Edit Profile
        </Button>
        <Button
          size={'md'}
          className="w-full"
          onClick={() => navigate('/friends?activeTab=add-friends')}
        >
          Add Friends
        </Button>
      </Stack>

      <Modal
        size={'lg'}
        isOpen={isOpen}
        onClose={closeModal}
        showCross={true}
        closeOnOutsideClick={false}
        className="bg-light-modalColor dark:bg-dark-modalColor py-4 px-6"
      >
        <Modal.Header>
          <h3 className="text-xl font-bold text-light-secondary dark:text-dark-secondary">
            Edit Profile
          </h3>
        </Modal.Header>
        <Modal.Content>
          <EditUserForm profile={profile} />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ProfileActions;
