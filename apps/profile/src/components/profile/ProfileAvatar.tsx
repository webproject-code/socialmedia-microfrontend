import { Avatar, AvatarImage, Box } from '@social-media/evoke-ui';
import React from 'react';

const ProfileAvatar: React.FC = () => {
  return (
    <>
      <Box
        as="div"
        className="xs:p-4 md:p-8 h-full w-full xs:justify-normal md:justify-center xs:items-center md:items-center flex md:flex-row xs:flex-col xs:gap-2 md:gap-4"
      >
        <Box
          as="div"
          id="avatar"
          className="xs:h-[50%] md:flex md:justify-normal md:h-auto w-auto md:gap-3"
        >
          <Avatar className="h-full w-full">
            <AvatarImage
              alt="Vishal Patel"
              className="ring-4 ring-secondary"
              src="https://mui.com/static/images/avatar/2.jpg"
            />
          </Avatar>
        </Box>
        <Box
          as="div"
          id="info"
          className="flex flex-col xs:items-center xs:justify-normal xs:gap-2 md:items-start h-auto xs:w-[50%] md:max-w-[80%]"
        >
          <p className="xs:text-lg md:text-2xl text-black dark:text-white  whitespace-nowrap">
            Vishal Patel
          </p>
          <Box as="div" className="  flex justify-normal gap-2 ">
            <img
              src="../../../assets/Vector.svg"
              alt="mailImg"
              className="h-auto w-6 object-contain"
            />
            <p className="xs:text-xs md:text-lg  text-black dark:text-white text-center m-auto">
              test@gmail.com
            </p>
          </Box>
          <p className="w-full xs:text-xs md:text-sm  text-light-silverSteel dark:text-white max-w- xs:whitespace-nowrap md:whitespace-normal overflow-hidden text-ellipsis break-words">
            Be the hero of your own story. Love, laugh, live. Never compromise.
            Be the best version of yourself. Upgrade for More Features.
          </p>
        </Box>
      </Box>
    </>
  );
};

export default ProfileAvatar;
