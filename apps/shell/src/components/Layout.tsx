import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="bg-silverSteel dark:bg-primary w-screen h-screen flex flex-col-reverse md:flex-row dark:text-white">
      <Sidebar />
      <div className="flex-grow h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
