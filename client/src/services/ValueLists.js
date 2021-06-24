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
  getTablesList() {
    return axios.get('/api/value_lists_tables');
  }

  /**
   * Returns the list of value_lists columns for a given table.
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  getColumnsList(table: string) {
    return axios.get(`/api/value_lists_columns?table=${table}`);
  }

}

export default new ValueLists();
