import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUserGroup } from 'react-icons/fa6';
import { IoChatbubble } from 'react-icons/io5';
import { ThemeToggle, useStore } from '@social-media/utils';
import { FaHome } from 'react-icons/fa';
import { AvatarImage, Button } from '@social-media/evoke-ui';

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();
  const { user } = useStore();

  if (!user) return <div className="text-center mt-4">Loading...</div>;

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname.startsWith(to);

  const navItems = [
    {
      to: '/',
      icon: (
        <FaHome className="w-6 h-6 md:w-8 md:h-8 focus-visible:outline-none" />
      ),
      label: 'Home',
      exact: true, // Ensure exact matching for Home
    },
    {
      to: '/chats',
      icon: (
        <IoChatbubble className="w-6 h-6 md:w-8 md:h-8 focus-visible:outline-none" />
      ),
      label: 'Chats',
    },
    {
      to: '/friends',
      icon: (
        <FaUserGroup className="w-6 h-6 md:w-8 md:h-8 focus-visible:outline-none" />
      ),
      label: 'Friends',
    },
    {
      to: `/users/${user.id}`,
      icon: (
        <AvatarImage
          src={user.profilePicture}
          alt={user.name}
          className="w-6 h-6 md:w-8 md:h-8 ring-0 focus-visible:outline-none"
        />
      ),
      label: 'Profile',
    },
  ];

  return (
    <aside
      className="flex w-full md:w-24 flex-row md:flex-col items-center p-2 md:p-4 md:py-8 md:space-y-6 border-t md:border-t-0 md:border-r border-gray-300 dark:border-gray-700 bg-light-modalColor/50 dark:bg-dark-modalColor/50"
      aria-label="Sidebar"
    >
      <Link to={'/'}>
        <img
          src="assets/Logo.svg"
          alt="logo"
          className="hidden md:block w-12 h-12 mb-4"
        />
      </Link>
      <ul
        className="flex flex-grow flex-row md:flex-col w-full items-center justify-around md:gap-6 md:justify-center"
        aria-label="Navigation-links"
      >
        {navItems.map(({ to, icon, label, exact }) => (
          <li key={to}>
            <Link tabIndex={-1} to={to} aria-label={label}>
              <Button
                variant={'ghost'}
                size="icon  "
                className={`${
                  isActive(to, exact)
                    ? 'text-light-secondary dark:text-dark-secondary '
                    : 'text-gray-500 dark:text-gray-400'
                } cursor-pointer group-hover:text-primary dark:group-hover:text-secondary relative group h-fit w-fit p-2 flex flex-col justify-center items-center gap-1`}
              >
                <span>{icon}</span>
                <span className="text-xs">{label}</span>
              </Button>
            </Link>
          </li>
        ))}
      </ul>
      <ThemeToggle />
    </aside>
  );
};

export default React.memo(Sidebar);
