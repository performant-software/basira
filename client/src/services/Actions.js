// @flow

import BaseService from './BaseService';

/**
 * Class for handling all actions API requests.
 */
class Actions extends BaseService {
  /**
   * Returns the actions base URL.
   *
   * @returns {string}
   */
  getBaseUrl() {
    return '/api/actions';
  }
}

export default new Actions();
