// @flow

import NestedAttributes from './NestedAttributes';
import Qualifications from './Qualifications';
import _ from 'underscore';
import String from '../utils/String';

/**
 * Class for handling transforming artwork_title records.
 */
class ArtworkTitles extends NestedAttributes {
  PARAM_NAME = 'artwork_titles';

  /**
   * Overrides the appendFormData function and defaults the collection name.
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

      Qualifications.appendFormData(formData, `${prefix}[${this.PARAM_NAME}][${index}]`, item);
    });
  }

  /**
   * Returns the artwork_titles payload keys.
   *
   * @returns {string[]}
   */
  getPayloadKeys() {
    return [
      'id',
      'title',
      'notes',
      'primary',
      '_destroy'
    ];
  }
}

export default new ArtworkTitles();
