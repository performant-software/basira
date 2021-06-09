// @flow

import BaseService from './BaseService';
import Person from '../transforms/Person';

/**
 * Class for handling all people API requests.
 */
class People extends BaseService {
  /**
   * Returns the people base URL.
   *
   * @returns {string}
   */
  getBaseUrl() {
    return '/api/people';
  }

  /**
   * Returns the people transform.
   *
   * @returns {Artwork}
   */
  getTransform() {
    return Person;
  }
}

export default new People();
