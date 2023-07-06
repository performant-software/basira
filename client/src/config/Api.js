// @flow

import axios from 'axios';
import _ from 'underscore';

if (process.env.NODE_ENV === 'development' && process.env.REACT_APP_API_URL) {
  _.extend(axios.defaults, { baseURL: process.env.REACT_APP_API_URL });
}

// Sets the authentication token as a request header
axios.interceptors.request.use((config) => {
  // Set the user authentication token
  const user = sessionStorage.getItem('user');
  if (user) {
    _.extend(config.headers, JSON.parse(user));
  }

  return config;
}, (error) => Promise.reject(error));
