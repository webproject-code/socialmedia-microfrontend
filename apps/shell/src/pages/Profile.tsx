import TopbarForMobile from '../components/TopbarForMobile';

type ProfileProps = {};

const Profile: React.FC<ProfileProps> = () => {
  return (
    <div>
      <TopbarForMobile title="Profile" />
      Profile
    </div>
  );
};

export default Profile;
