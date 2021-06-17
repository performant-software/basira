// @flow

import _ from 'underscore';
import type { ValueList as ValueListType } from '../types/ValueList';

/**
 * Class for handling transforming value_list records.
 */
class ValueList {
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
   * Converts the passed value_list to a dropdown option.
   *
   * @param option
   *
   * @returns {{text: string, value: string, key: string}}
   */
  toDropdown(option: ValueListType) {
    return {
      key: option.value,
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
