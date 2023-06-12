import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './config/Api';
import './i18n/i18n';

import '@performant-software/semantic-components/build/semantic-ui.css';
import '@performant-software/semantic-components/build/main.css';
import 'rc-slider/assets/index.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
