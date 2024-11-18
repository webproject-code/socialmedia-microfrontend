import React from 'react';
import UserProfile from '../pages/UserProfile';

const ProfileWrapper: React.FC = () => {
  return (
    <div className="bg-light-primary dark:bg-dark-primary dark:text-white h-screen w-full p-4 md:p-6">
      <UserProfile />
    </div>
  );
};

export default ProfileWrapper;
