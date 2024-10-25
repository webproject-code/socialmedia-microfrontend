import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '../styles.css';
import '@social-media/evoke-ui/dist/styles.css';
import { routes } from '../routes';

export function App() {
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
}

export default App;
