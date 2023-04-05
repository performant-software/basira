// @flow

import NestedAttributes from './NestedAttributes';
import type { Qualifiable } from '../types/concerns/Qualifiable';

/**
 * Class for handling transforming qualification records.
 */
class Qualifications extends NestedAttributes {
  PARAM_NAME = 'qualifications';

  /**
   * Overrides the appendFormData function and defaults the collection name.
   *
   * @param formData
   * @param prefix
   * @param record
   * @param collection
   */
  appendFormData(formData: FormData, prefix: string, record: *, collection: string = this.PARAM_NAME) {
    super.appendFormData(formData, prefix, record, collection);
  }

  /**
   * Returns the qualification payload keys.
   *
   * @returns {string[]}
   */
  getPayloadKeys() {
    return [
      'id',
      'notes',
      'persistent',
      'form_field',
      'qualifiable_type',
      'qualifiable_id',
      'value_list_id',
      '_destroy'
    ];
  }

  /**
   * Returns the qualification object to be sent to the server on POST/PUT requests.
   *
   * @param record
   * @param collection
   *
   * @returns {{}}
   */
  toPayload(record: Qualifiable, collection: string = this.PARAM_NAME) {
    return super.toPayload(record, collection);
  }
}

export default new Qualifications();
