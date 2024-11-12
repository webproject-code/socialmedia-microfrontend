import { Divider, Stack } from '@social-media/evoke-ui';
import { useStore } from '@social-media/utils';
import React from 'react';

// Sample data for suggested friends
const suggestedFriends = [
  { id: 1, name: 'Kashyap', status: "April fool's day" },
  { id: 2, name: 'Kashyap', status: "April fool's day" },
];

const Home: React.FC = () => {
  const { user } = useStore();

  if (!user) return null;

  return (
    <Stack className="w-full h-full">
      <Stack align="center" justify="center" className="w-full">
        <h1 className="text-2xl font-semibold text-light-secondary dark:text-dark-secondary">
          Welcome to Social Media App
        </h1>
      </Stack>
      <Divider alignment="vertical" className="border-gray-500" />
      <Stack spacing="medium" direction="column" className="w-[400px]">
        {/* Profile Section */}
        <div className="text-center">
          <img
            src={user.profilePicture} // Replace with the actual profile image URL
            alt="Profile"
            className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full mx-auto object-cover"
          />
          <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
          <p className="text-light-secondary dark:text-dark-secondary mt-1 text-sm md:text-base">
            {user.email}
          </p>
        </div>
        {/* <Divider alignment="horizontal" className="border-gray-300 px-4" /> */}
        {/* Suggested Friends Section */}
        <div className="suggested-friends">
          <Stack justify="between" className="w-full">
            <h3>Suggested Friends</h3>
            <p className="view-all">view all</p>
          </Stack>
          {suggestedFriends.map((friend) => (
            <div key={friend.id} className="friend">
              <img
                src="https://via.placeholder.com/50" // Replace with actual friend's image URL
                alt={friend.name}
                className="friend-image"
              />
              <div className="friend-info">
                <p className="friend-name">{friend.name}</p>
                <p className="friend-status">{friend.status}</p>
              </div>
              <button className="visit-profile">Visit Profile</button>
            </div>
          ))}
        </div>
      </Stack>
    </Stack>
  );
};

export default Home;
