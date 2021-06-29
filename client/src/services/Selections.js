// @flow

import BaseService from './BaseService';
import Selection from '../transforms/Selection';
import axios from 'axios';

/**
 * Service class for all selections based API calls.
 */
class Selections extends BaseService {
  /**
   * Returns the selections base URL.
   *
   * @returns {string}
   */
  getBaseUrl() {
    return '/api/selections';
  }

  /**
   * Returns the selection transform object.
   *
   * @returns {Selection}
   */
  getTransform() {
    return Selection;
  }

}

export default new Selections();
