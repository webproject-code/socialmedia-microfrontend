import { Button, Modal } from '@social-media/evoke-ui';
import { useState } from 'react';
import EditUserForm from './EditUserForm';
import { UserProfile } from '@social-media/api';

type EditProfileButtonProps = {
  ownerProfile: UserProfile;
};

const EditProfileButton: React.FC<EditProfileButtonProps> = ({
  ownerProfile,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div>
      <Button size="md" onClick={openModal} className="w-fit">
        Edit Profile
      </Button>
      <Modal
        size={'lg'}
        isOpen={isOpen}
        onClose={closeModal}
        showCross={true}
        closeOnOutsideClick={true}
        style={{ zIndex: 10000 }}
        className="bg-light-modalColor dark:bg-dark-modalColor py-4 px-6"
      >
        <Modal.Header>
          <h3 className="text-xl font-bold text-light-secondary dark:text-dark-secondary">
            Edit Profile
          </h3>
        </Modal.Header>
        <Modal.Content>
          <EditUserForm profile={ownerProfile} />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default EditProfileButton;
