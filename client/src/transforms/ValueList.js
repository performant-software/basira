// @flow

import _ from 'underscore';
import type { ValueList as ValueListType } from '../types/ValueList';
import NestedAttributes from './NestedAttributes';


/**
 * Class for handling transforming value_list records.
 */
class ValueList extends NestedAttributes {
  PARAM_NAME = 'value_lists'

  PAYLOAD_KEYS = [
    'id',
    'table',
    'column',
    'value',
    'authorized_vocabulary',
    'url_database_value',
    'comment',
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
   * Returns the value_list payload keys.
   *
   * @returns {string[]}
   */
  getPayloadKeys() {
    return this.PAYLOAD_KEYS;
  }

  /**
   * Converts the passed value_list to a dropdown option.
   *
   * @param option
   *
   * @returns {{text: string, value: string, key: string}}
   */
  toDropdown(option: ValueListType) {
    return {
      key: option.id,
      value: option.value,
      text: option.value
    };
  }

  /**
   * Returns the value_list object to be sent to the server on POST/PUT requests.
   *
   * @param option
   *
   * @returns {*}
   */
  toPayload(option: ValueListType) {
    return { value_list: _.pick(option, this.PAYLOAD_KEYS) };
  }
}

export default new ValueList();
