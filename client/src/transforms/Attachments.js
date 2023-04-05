// @flow

import _ from 'underscore';
import NestedAttributes from './NestedAttributes';
import Qualifications from './Qualifications';
import String from '../utils/String';

/**
 * Class for handling transforming attachments records.
 */
class Attachments extends NestedAttributes {
  PARAM_NAME = 'attachments';

  /**
   * Overrides the appendFormData function to conditionally append the "file" prop only if a value is present. There
   * could be a situation where we change the "primary" indicator without changing the file contents.
   *
   * @param formData
   * @param prefix
   * @param record
   * @param collection
   */
  appendFormData(formData: FormData, prefix: string, record: *, collection: string = this.PARAM_NAME) {
    _.each(record[collection], (attachment, index) => {
      _.each(this.getPayloadKeys(), (key) => {
        formData.append(`${prefix}[${collection}][${index}][${key}]`, String.toString(attachment[key]));
      });

      if (attachment.file) {
        formData.append(`${prefix}[${collection}][${index}][file]`, String.toString(attachment.file));
      }

      Qualifications.appendFormData(formData, `${prefix}[attachments][${index}]`, attachment);
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
      'primary',
      '_destroy'
    ];
  }
}

export default new Attachments();
