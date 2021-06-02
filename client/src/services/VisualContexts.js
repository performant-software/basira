// @flow

import BaseService from './BaseService';
import VisualContext from '../transforms/VisualContext';

class VisualContexts extends BaseService {
  /**
   * Returns the visual contexts base URL.
   *
   * @returns {string}
   */
  getBaseUrl() {
    return '/api/visual_contexts';
  }

  /**
   * Returns the visual context transform.
   *
   * @returns {VisualContext}
   */
  getTransform() {
    return VisualContext;
  }
}

export default new VisualContexts();
