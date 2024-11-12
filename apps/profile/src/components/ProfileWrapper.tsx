import React from 'react';
import UserProfile from '../pages/UserProfile';

const ProfileWrapper: React.FC = () => {
  return (
    <div className="bg-light-primary dark:bg-dark-primary dark:text-white max-h-auto min-h-screen w-screen p-4 sm:p-10 ">
      <UserProfile />
    </div>
  );
};

export default ProfileWrapper;
