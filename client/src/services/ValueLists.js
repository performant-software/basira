// @flow

import BaseService from './BaseService';
import ValueList from '../transforms/ValueList';
import axios from 'axios';

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

  /**
   * Returns the list of value_lists tables.
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  getObjectsList() {
    return axios.get('/api/value_lists_objects');
  }

  /**
   * Returns the list of value_lists columns for a given table.
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  getGroupsList(object: string) {
    return axios.get(`/api/value_lists_groups?object=${object}`);
  }
}

export default new ValueLists();
