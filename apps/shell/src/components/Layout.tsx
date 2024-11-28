import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import { SocketProvider } from '@social-media/api';

const Layout: React.FC = () => {
  return (
    <SocketProvider>
      <div className="flex h-screen w-screen flex-col-reverse md:flex-row bg-light-primary dark:bg-dark-primary dark:text-white">
        <Sidebar />
        <div className="flex-grow overflow-hidden w-full h-full">
          <Outlet />
        </div>
      </div>
    </SocketProvider>
  );
};

export default Layout;
