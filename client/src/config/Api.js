// @flow

import axios from 'axios';
import _ from 'underscore';

// Sets the authentication token as a request header
axios.interceptors.request.use((config) => {
  // Set the user authentication token
  const user = sessionStorage.getItem('user');
  if (user) {
    _.extend(config.headers, JSON.parse(user));
  }

  return config;
}, (error) => Promise.reject(error));
