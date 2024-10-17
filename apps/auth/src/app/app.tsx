import '@social-media/evoke-ui/dist/styles.css';
import '../styles.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from '../routes';

export const App: React.FC = () => {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default App;
