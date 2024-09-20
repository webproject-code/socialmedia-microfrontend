import TopbarForMobile from '../components/TopbarForMobile';

type HomeProps = {};

const Home: React.FC<HomeProps> = () => {
  return (
    <div>
      <TopbarForMobile title="Home" />
      Home
    </div>
  );
};

export default Home;
