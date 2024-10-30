import '@social-media/evoke-ui/dist/styles.css';
import '../styles.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from '../routes';
import {
  ReactQueryProvider,
  ThemeContextProvider,
  ThemeToggle,
} from '@social-media/utils';

export const App: React.FC = () => {
  const router = createBrowserRouter(routes);
  return (
    <ReactQueryProvider>
      <ThemeContextProvider>
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        <RouterProvider router={router} />
      </ThemeContextProvider>
    </ReactQueryProvider>
  );
};

export default App;
