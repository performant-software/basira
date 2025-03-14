import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import './config/Api';
import './i18n/i18n';

import '@performant-software/semantic-components/style.css';
import '@performant-software/shared-components/style.css';
import 'rc-slider/assets/index.css';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
