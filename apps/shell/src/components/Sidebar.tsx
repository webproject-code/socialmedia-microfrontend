import { Link, useLocation } from 'react-router-dom';
import { FaUserGroup, FaUser } from 'react-icons/fa6';
import { IoChatbubble } from 'react-icons/io5';
import { FaHome } from 'react-icons/fa';

const navItems = [
  {
    to: '/',
    icon: <FaHome className="w-8 h-8 md:w-10 md:h-10" />,
    label: 'Home',
  },
  {
    to: '/chats',
    icon: <IoChatbubble className="w-8 h-8 md:w-10 md:h-10" />,
    label: 'Chats',
  },
  {
    to: '/friends',
    icon: <FaUserGroup className="w-8 h-8 md:w-10 md:h-10" />,
    label: 'Friends',
  },
  {
    to: '/profile',
    icon: <FaUser className="w-7 h-7 md:w-8 md:h-8" />,
    label: 'Profile',
  },
];

const Sidebar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <div className="h-fit w-full md:w-[100px] md:h-full border-silverSteel/30 border-t-2 md:border-r-2 md:border-t-0 flex flex-col items-center p-4 gap-2">
      <img
        src="../assets/Logo.svg"
        alt="logo"
        width={56}
        height={56}
        className="hidden md:flex"
      />
      <ul className="h-full w-full flex flex-row md:flex-col justify-between md:justify-center gap-6 items-center px-2 py-1 md:p-0">
        {navItems.map(({ to, icon, label }) => (
          <li
            key={to}
            className={pathname === to ? 'text-secondary' : 'text-silverSteel'}
            aria-label={label}
          >
            <Link to={to}>{icon}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
