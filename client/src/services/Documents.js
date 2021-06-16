// @flow

import BaseService from './BaseService';
import Document from '../transforms/Document';

class Documents extends BaseService {
  /**
   * Returns the documents base URL.
   *
   * @returns {string}
   */
  getBaseUrl() {
    return '/api/documents';
  }

  /**
   * Returns the documents transform.
   *
   * @returns {Document}
   */
  getTransform() {
    return Document;
  }
}

export default new Documents();
