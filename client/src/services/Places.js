// @flow

import BaseService from './BaseService';
import Place from '../transforms/Place';

/**
 * Class for handling all places API requests.
 */
class Places extends BaseService {
  /**
   * Returns the places base URL.
   *
   * @returns {string}
   */
  getBaseUrl() {
    return '/api/places';
  }

  /**
   * Returns the people transform.
   *
   * @returns {Place}
   */
  getTransform() {
    return Place;
  }
}

export default new Places();
