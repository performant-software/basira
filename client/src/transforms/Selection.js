// @flow

import _ from 'underscore';
import type { Selection as SelectionType } from '../types/Selection';
import NestedAttributes from './NestedAttributes';


/**
 * Class for handling transforming selection records.
 */
class Selection extends NestedAttributes {
  PARAM_NAME = 'selections'

  PAYLOAD_KEYS = [
    'id',
    'selectable_type',
    'selectable_id',
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
   * Returns the selection payload keys.
   *
   * @returns {string[]}
   */
  getPayloadKeys() {
    return this.PAYLOAD_KEYS;
  }

  /**
   * Returns the selection object to be sent to the server on POST/PUT requests.
   *
   * @param option
   *
   * @returns {*}
   */
  toPayload(option: SelectionType) {
    return { selections: _.pick(option, this.PAYLOAD_KEYS) };
  }
}

export default new Selection();
