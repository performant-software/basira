// @flow

import axios from 'axios';

/**
 * Services class responsible for all authentication based API calls.
 */
class Authentication {
  /**
   * Calls the /api/auth/sign_in end point with the passed email and password.
   *
   * @param email
   * @param password
   *
   * @returns {Promise<AxiosResponse<any>>}
   */
  login(email: ?string, password: ?string) {
    return axios.post('/auth/sign_in', { email, password });
  }

  /**
   * Calls the api/auth/sign_out end point.
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  logout() {
    return axios.delete('/auth/sign_out');
  }
}

export default new Authentication();
