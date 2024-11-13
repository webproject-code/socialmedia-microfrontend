import { useLogout } from '@social-media/api';
import { Button, Modal, Stack } from '@social-media/evoke-ui';
import { useStore } from '@social-media/utils';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { logout, setVisitedUser } = useStore();
  const { mutate } = useLogout();
  const navigate = useNavigate();

  const logoutHandler = () => {
    mutate(undefined, {
      onSuccess: () => {
        logout();
        setVisitedUser(null);
        navigate('/');
      },
    });
  };

  return (
    <>
      <Button onClick={openModal} className="xs:w-full sm:w-fit flex-1">
        Logout
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
              Logout User ?
            </h3>
          </Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to logout ?</p>
          </Modal.Content>
          <Modal.Footer>
            <Stack spacing="small" justify="end">
              <Button variant="outline" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={logoutHandler}>
                Logout
              </Button>
            </Stack>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default LogoutButton;
