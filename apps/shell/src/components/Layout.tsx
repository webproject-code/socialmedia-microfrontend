import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen w-screen flex-col-reverse md:flex-row bg-light-primary dark:bg-dark-primary dark:text-white">
      <Sidebar />
      <div className="flex-grow p-4 overflow-auto w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
