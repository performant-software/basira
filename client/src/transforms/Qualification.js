// @flow

import _ from 'underscore';
import type { Qualification as QualificationType } from '../types/Qualification';
import NestedAttributes from './NestedAttributes';

/**
 * Class for handling transforming qualification records.
 */
class Qualification extends NestedAttributes {
  PARAM_NAME = 'qualifications'

  PAYLOAD_KEYS = [
    'id',
    'notes',
    'persistent',
    'qualifiable_type',
    'qualifiable_id',
    'value_list_id',
    '_destroy'
  ];

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
    return this.PAYLOAD_KEYS;
  }

  /**
   * Returns the qualification object to be sent to the server on POST/PUT requests.
   *
   * @param option
   *
   * @returns {*}
   */
  toPayload(option: QualificationType) {
    return { qualifications: _.pick(option, this.PAYLOAD_KEYS) };
  }
}

export default new Qualification();
