// @flow

import _ from 'underscore';
import NestedAttributes from './NestedAttributes';
import Qualifications from './Qualifications';
import String from '../utils/String';

class Actions extends NestedAttributes {
  PARAM_NAME = 'actions';

  /**
   * Returns the actions payload keys.
   *
   * @returns {string[]}
   */
  getPayloadKeys() {
    return [
      'id',
      'notes',
      '_destroy'
    ];
  }

  /**
   * Overrides the super class by appending form data for any related qualifications.
   *
   * @param formData
   * @param prefix
   * @param record
   * @param collection
   */
  appendFormData(formData: FormData, prefix: string, record: *, collection: string = this.PARAM_NAME) {
    _.each(record[collection], (item, index) => {
      _.each(this.getPayloadKeys(), (key) => {
        formData.append(`${prefix}[${collection}][${index}][${key}]`, String.toString(item[key]));
      });

      Qualifications.appendFormData(formData, `[${prefix}][${collection}][${index}]`, item);
    });
  }
}

export default new Actions();
