// @flow

import BaseService from './BaseService';
import ValueList from '../transforms/ValueList';

/**
 * Service class for all value_lists based API calls.
 */
class ValueLists extends BaseService {
  /**
   * Returns the value_lists base URL.
   *
   * @returns {string}
   */
  getBaseUrl() {
    return '/api/value_lists';
  }

  /**
   * Returns the value_list transform object.
   *
   * @returns {ValueList}
   */
  getTransform() {
    return ValueList;
  }
}

export default new ValueLists();
