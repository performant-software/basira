// @flow

import BaseService from './BaseService';

/**
 * Class for handling all home API requests.
 */
class Home extends BaseService {
  /**
   * Returns the home base URL.
   *
   * @returns {string}
   */
  getBaseUrl() {
    return '/api/home';
  }

  /**
   * Returns the home transform. Not implemented.
   *
   * @returns {{}}
   */
  getTransform() {
    return {};
  }
}

export default new Home();
