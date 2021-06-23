// @flow

class BaseTransform {
  /**
   * Constructs a new BaseTransform object. This constructor should never be used directly.
   */
  constructor() {
    if (this.constructor === BaseTransform) {
      throw new TypeError('Abstract class "BaseTransform" cannot be instantiated directly.');
    }
  }

  /**
   * Returns the array of payload keys.
   *
   * @returns {*[]}
   */
  getPayloadKeys() {
    // Implemented in sub-class
    return [];
  }

  /**
   * Returns the object for POST/PUT requests.
   *
   * @param record
   *
   * @returns {{}}
   */
  // eslint-disable-next-line no-unused-vars
  toPayload(record: any) {
    // Implemented in sub-class
    return {};
  }
}

export default BaseTransform;
