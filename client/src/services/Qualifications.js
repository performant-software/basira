// @flow

import BaseService from './BaseService';
import Qualification from '../transforms/Qualification';
import axios from 'axios';

/**
 * Service class for all qualifications based API calls.
 */
class Qualifications extends BaseService {
  /**
   * Returns the qualifications base URL.
   *
   * @returns {string}
   */
  getBaseUrl() {
    return '/api/qualifications';
  }

  /**
   * Returns the qualification transform object.
   *
   * @returns {Qualification}
   */
  getTransform() {
    return Qualification;
  }

}

export default new Qualifications();
