// @flow

import Artwork from '../transforms/Artwork';
import BaseService from './BaseService';

/**
 * Class for handling all artworks API requests.
 */
class Artworks extends BaseService {
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
