import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { ReactQueryProvider, ThemeContextProvider } from '@social-media/utils';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ReactQueryProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </ReactQueryProvider>
  </StrictMode>
);
