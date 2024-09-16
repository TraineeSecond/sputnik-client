import './i18n';
import App from 'app/App';
import { createRoot } from 'react-dom/client';

import 'antd/dist/reset.css';

import 'app/styles/globals.css';

createRoot(document.getElementById('root')!).render(<App />);
