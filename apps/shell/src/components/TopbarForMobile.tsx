import React from 'react';

type TopbarForMobileProps = {
  title: string;
};

const TopbarForMobile: React.FC<TopbarForMobileProps> = ({ title }) => {
  return (
    <div className="flex md:hidden w-full p-4 items-center gap-4 ">
      <img src="../assets/Logo.svg" alt="logo" width={32} height={32} />
      <h3 className="font-secondary text-lg font-medium">{title}</h3>
    </div>
  );
};

export default TopbarForMobile;
