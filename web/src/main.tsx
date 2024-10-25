import App from 'app/App';
import { createRoot } from 'react-dom/client';

import 'antd/dist/reset.css';

import 'app/styles/globals.css';
import 'leaflet/dist/leaflet.css';

import './i18n';

createRoot(document.getElementById('root')!).render(<App />);
