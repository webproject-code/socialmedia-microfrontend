import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserGroup, FaUser } from 'react-icons/fa6';
import { IoChatbubble } from 'react-icons/io5';
import { ThemeToggle, useStore } from '@social-media/utils';
import { FaHome } from 'react-icons/fa';

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const { user } = useStore();

  if (!user) return <div className="text-center mt-4">Loading...</div>;

  const navItems = [
    {
      to: '/',
      icon: <FaHome className="w-6 h-6 md:w-8 md:h-8" />,
      label: 'Home',
      exact: true, // Ensure exact matching for Home
    },
    {
      to: '/chats',
      icon: <IoChatbubble className="w-6 h-6 md:w-8 md:h-8" />,
      label: 'Chats',
    },
    {
      to: '/friends',
      icon: <FaUserGroup className="w-6 h-6 md:w-8 md:h-8" />,
      label: 'Friends',
    },
    {
      to: `/users/${user.id}`,
      icon: <FaUser className="w-6 h-6 md:w-8 md:h-8" />,
      label: 'Profile',
    },
  ];

  return (
    <aside className="flex w-full md:w-24 flex-row md:flex-col items-center p-2 md:p-4 md:py-8 md:space-y-6 border-t md:border-t-0 md:border-r border-gray-300 dark:border-gray-700 bg-light-modalColor/50 dark:bg-dark-modalColor/50">
      <Link to={'/'}>
        <img
          src="assets/Logo.svg"
          alt="logo"
          className="hidden md:block w-12 h-12 mb-4"
        />
      </Link>
      <ul className="flex flex-grow flex-row md:flex-col w-full items-center justify-around md:space-y-8 md:justify-center">
        {navItems.map(({ to, icon, label, exact }) => (
          <li key={to} className="relative group">
            <Link
              to={to}
              className={`${
                (exact ? pathname === to : pathname.startsWith(to))
                  ? 'text-light-secondary dark:text-dark-secondary'
                  : 'text-gray-500 dark:text-gray-400'
              } group-hover:text-primary dark:group-hover:text-secondary`}
              aria-label={label}
            >
              <div>{icon}</div>
            </Link>
          </li>
        ))}
      </ul>
      <ThemeToggle />
    </aside>
  );
};

export default Sidebar;
