import { Button, Modal } from '@social-media/evoke-ui';
import { useState } from 'react';
import EditUserForm from './EditUserForm';

const EditProfileButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <Button onClick={openModal} className="sm:w-[200px]" tabIndex={0}>
        Edit Profile
      </Button>
      {isOpen && (
        <Modal
          size={'lg'}
          isOpen={isOpen}
          onClose={closeModal}
          showCross={true}
          closeOnOutsideClick={true}
          className="bg-light-modalColor dark:bg-dark-modalColor py-4 px-6 z-5"
        >
          <Modal.Header>
            <h3 className="text-xl font-bold text-light-secondary dark:text-dark-secondary">
              Edit Profile
            </h3>
          </Modal.Header>
          <Modal.Content>
            <EditUserForm />
          </Modal.Content>
        </Modal>
      )}
    </>
  );
};

export default EditProfileButton;
