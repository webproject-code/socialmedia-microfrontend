import { SocketProvider } from '@social-media/api';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

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
