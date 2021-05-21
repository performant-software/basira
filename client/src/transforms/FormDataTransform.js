// @flow

import _ from 'underscore';
import String from '../utils/String';

class FormDataTransform {
  /**
   * Constructs a new BaseTransform object. This constructor should never be used directly.
   */
  constructor() {
    if (this.constructor === FormDataTransform) {
      throw new TypeError('Abstract class "FormDataTransform" cannot be instantiated directly.');
    }
  }

  /**
   * Returns the parameter name.
   *
   * @returns {string}
   */
  getParameterName() {
    // Implemented in sub-class
    return '';
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
   * Converts the passed records to a formData object to be sent on PUT/POST requests.
   *
   * @param record
   *
   * @returns {FormData}
   */
  toPayload(record: any) {
    const formData = new FormData();

    _.each(this.getPayloadKeys(), (key) => {
      formData.append(`${this.getParameterName()}[${key}]`, String.toString(record[key]));
    });

    return formData;
  }
}

export default FormDataTransform;
