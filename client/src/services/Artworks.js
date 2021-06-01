// @flow

import Artwork from '../transforms/Artwork';
import BaseService from './BaseService';
import axios from 'axios';

/**
 * Class for handling all artworks API requests.
 */
class Artworks extends BaseService {
  /**
   * Calls the GET /api/artworks/:id/nested endpoint.
   *
   * @returns {Promise<AxiosResponse<T>>}
   */
  fetchNested(id: number) {
    return axios.get(`${this.getBaseUrl()}/${id}/nested`);
  }

  /**
   * Returns the artworks base URL.
   *
   * @returns {string}
   */
  getBaseUrl() {
    return '/api/artworks';
  }

  /**
   * Returns the artworks transform.
   *
   * @returns {Artwork}
   */
  getTransform() {
    return Artwork;
  }
}

export default new Artworks();
