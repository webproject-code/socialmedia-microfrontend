import * as React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from '../routes';

import '../styles.css';
// const Auth = React.lazy(() => import('auth/Module'));

export function App() {
  const router = createBrowserRouter(routes);

  return (
    <React.Suspense fallback={null}>
      <RouterProvider router={router} />
    </React.Suspense>
  );
}

export default App;
