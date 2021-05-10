import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './config/Api';
import './i18n/i18n';

import 'semantic-ui-css/semantic.css';
import 'react-components/build/main.css';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
