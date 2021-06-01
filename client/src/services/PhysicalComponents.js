// @flow

import BaseService from './BaseService';
import PhysicalComponent from '../transforms/PhysicalComponent';

class PhysicalComponents extends BaseService {
  /**
   * Returns the physical components base URL.
   *
   * @returns {string}
   */
  getBaseUrl() {
    return '/api/physical_components';
  }

  /**
   * Returns the physical components transform.
   *
   * @returns {PhysicalComponent}
   */
  getTransform() {
    return PhysicalComponent;
  }
}

export default new PhysicalComponents();
