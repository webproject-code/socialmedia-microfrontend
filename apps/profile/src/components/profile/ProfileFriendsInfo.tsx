import { Box, Button, Modal } from '@social-media/evoke-ui';
import React, { useState } from 'react';

const ProfileFriendsInfo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <Box
        as="div"
        className="xs:p-4 md:p-8 h-full w-full flex flex-col items-center  md:justify-center lg:justify-start gap-4 "
      >
        <Box as="div" id="friends-count" className="">
          <p className="xs:text-3xl md:text-4xl dark:text-dark-secondary">
            172
          </p>
          <p className="xs:text-lg md:text-xl  text-light-silverSteel  dark:text-white">
            Friends
          </p>
        </Box>
        <Box as="div" id="btn-action-profile" className="">
          <Box as="div" className="flex xs:flex-col sm:flex-row gap-2">
            <Button
              size={'md'}
              onClick={openModal}
              className="whitespace-nowrap text-white h-auto w-auto"
            >
              Edit Profile
            </Button>
            <Button
              size={'md'}
              className="whitespace-nowrap text-white h-auto w-auto"
            >
              Add Friends
            </Button>
          </Box>
        </Box>
      </Box>

      <Modal
        size={'lg'}
        isOpen={isOpen}
        onClose={closeModal}
        showCross={false}
        closeOnOutsideClick={false}
        className="bg-light-primary dark:bg-dark-primary"
      >
        <Modal.Header>
          <h2 className="text-xl font-semibold text-black dark:text-white ">
            Edit User
          </h2>
        </Modal.Header>

        <Modal.Content>
          <form className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row md:justify-between items-start gap-2">
              <label
                htmlFor="profile_img"
                className="md:w-1/4 text-black dark:text-white"
              >
                Profile Image
              </label>
              <input
                type="file"
                id="profile_img"
                accept=".png, .jpg, .jpeg"
                placeholder="Select your profile image"
                className="border-2 border-gray-300 rounded-md p-2 bg-transparent md:w-3/4 w-full"
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between items-start gap-2">
              <label
                htmlFor="email"
                className="md:w-1/4 text-black dark:text-white"
              >
                Username
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="border-2 border-gray-300 rounded-md p-2 bg-transparent md:w-3/4 w-full"
              />
            </div>
            <div className="flex flex-col md:flex-row md:justify-between items-start gap-2">
              <label
                htmlFor="input"
                className="md:w-1/4 text-black dark:text-white"
              >
                Bio
              </label>
              <input
                type="input"
                id="bio"
                placeholder="Enter your password"
                className="border-2 border-gray-300 rounded-md p-2 bg-transparent md:w-3/4 w-full"
              />
            </div>
          </form>
        </Modal.Content>
        <Modal.Footer className="flex justify-between">
          <Button
            onClick={closeModal}
            className="w-25 justify-center text-black border-black dark:border-white"
            variant={'outline'}
          >
            Cancel
          </Button>
          <Button
            onClick={closeModal}
            className="w-25 justify-center"
            variant={'destructive'}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileFriendsInfo;
