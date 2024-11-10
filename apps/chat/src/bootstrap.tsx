import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import {
  ReactQueryProvider,
  ThemeContextProvider,
  ThemeToggle,
} from '@social-media/utils';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <React.Suspense fallback={null}>
      <ReactQueryProvider>
        <ThemeContextProvider>
          <App />
          <div className="absolute top-10 right-10">
            <ThemeToggle />
          </div>
        </ThemeContextProvider>
      </ReactQueryProvider>
    </React.Suspense>
  </StrictMode>
);
