// @flow

import BaseService from './BaseService';
import User from '../transforms/User';

/**
 * Class for handling all user API requests.
 */
class Users extends BaseService {
  /**
   * Returns the users base URL.
   *
   * @returns {string}
   */
  getBaseUrl() {
    return '/api/users';
  }

  /**
   * Returns the users transform.
   *
   * @returns {User}
   */
  getTransform() {
    return User;
  }
}

export default new Users();
