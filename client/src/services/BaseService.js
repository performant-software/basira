// @flow

import axios from 'axios';
import Filterable from './Filterable';

class BaseService {
  /**
   * Constructs a new BaseService object. This constructor should never be used directly.
   */
  constructor() {
    if (this.constructor === BaseService) {
      throw new TypeError('Abstract class "BaseService" cannot be instantiated directly.');
    }
  }

  /**
   * Calls the POST /api/<resource>/ endpoint with the passed item.
   *
   * @param item
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  create(item: any) {
    const transform = this.getTransform();

    // $FlowFixMe - Flow doesn't currently support abstract classes
    return axios.post(this.getBaseUrl(), transform.toPayload(item), this.getConfig());
  }

  /**
   * Calls the DELETE /api/<resource>/:id endpoint for the passed item.
   *
   * @param item
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  delete(item: any) {
    return axios.delete(`${this.getBaseUrl()}/${item.id}`);
  }

  /**
   * Calls the GET /api/<resource>/ endpoint.
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  fetchAll(params: any) {
    return axios.get(this.getBaseUrl(), { params });
  }

  /**
   * Calls the GET /api/<resource>/:id endpoint.
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  fetchOne(id: number) {
    return axios.get(`${this.getBaseUrl()}/${id}`);
  }

  /**
   * Calls the create/update API endpoint for the passed item.
   *
   * @param item
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  save(item: any) {
    return item.id ? this.update(item) : this.create(item);
  }

  /**
   * Calls the POST /api/<resource>/search endpoint.
   *
   * @param params
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  search(params: any) {
    return axios.post(`${this.getBaseUrl()}/search`, Filterable.prepareParameters(params));
  }

  /**
   * Calls the PUT /api/<resource>/:id endpoint with the passed item.
   *
   * @param item
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  update(item: any) {
    const transform = this.getTransform();

    // $FlowFixMe - Flow doesn't currently support abstract classes
    return axios.put(`${this.getBaseUrl()}/${item.id}`, transform.toPayload(item), this.getConfig());
  }

  // protected

  /**
   * Returns the API base URL string.
   */
  getBaseUrl() {
    // Implemented in concrete classes.
    return '';
  }

  /**
   * Returns the config properties for POST/PUT requests.
   *
   * @returns {null}
   */
  getConfig() {
    // Implemented in concrete classes
    return null;
  }

  /**
   * Returns the transform object. This class will be used to generate the object sent on POST/PUT requests.
   */
  getTransform() {
    // Implemented in concrete classes.
    return {};
  }
}

export default BaseService;
