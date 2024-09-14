import { StrictMode } from 'react';

import App from './app/App.tsx';
import './i18n';
import { createRoot } from 'react-dom/client';

import 'antd/dist/reset.css';

import './app/styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
