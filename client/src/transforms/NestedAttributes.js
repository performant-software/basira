// @flow

import _ from 'underscore';
import String from '../utils/String';

/**
 * Class for handling transforming nested attributes of a parent object. This class will handle transforming the
 * object into a payload to be sent to a POST/PUT request on an API. This class currently supports transforming into
 * a plain Javascript object or a FormData object.
 */
class NestedAttributes {
  /**
   * Constructs a new NestedAttributes object. This constructor should never be used directly.
   */
  constructor() {
    if (this.constructor === NestedAttributes) {
      throw new TypeError('Abstract class "NestedAttributes" cannot be instantiated directly.');
    }
  }

  /**
   * Appends the passed record's collection to the form data.
   *
   * @param formData
   * @param prefix
   * @param record
   * @param collection
   */
  appendFormData(formData: FormData, prefix: string, record: any, collection: string) {
    _.each(record[collection], (item, index) => {
      _.each(this.getPayloadKeys(), (key) => {
        formData.append(`${prefix}[${collection}][${index}][${key}]`, String.toString(item[key]));
      });
    });
  }

  /**
   * Returns the payload keys.
   *
   * @returns {*[]}
   */
  getPayloadKeys() {
    // Implemented in sub-classes
    return [];
  }

  /**
   * Transforms the passed record's collection to a payload object.
   *
   * @param record
   * @param collection
   *
   * @returns {{[p: string]: *}}
   */
  toPayload(record: any, collection: string) {
    return {
      [collection]: _.map(record[collection], (item) => _.pick(item, this.getPayloadKeys()))
    };
  }
}

export default NestedAttributes;
