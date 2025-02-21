// @flow

import _ from 'underscore';
import BaseTransform from './BaseTransform';
import Qualifications from './Qualifications';

import type { ValueList as ValueListType } from '../types/ValueList';

/**
 * Class for handling transforming value_list records.
 */
class ValueList extends BaseTransform {
  PARAM_NAME = 'value_lists';

  PAYLOAD_KEYS = [
    'id',
    'object',
    'group',
    'human_name',
    'authorized_vocabulary',
    'authorized_vocabulary_url',
    'database_value',
    'comment',
    '_destroy'
  ];

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
   * @param attributes
   *
   * @returns {{[p: string]: *}}
   */
  toDropdown(option: ValueListType, attributes: any = {}) {
    return {
      ...attributes,
      key: option.id,
      value: option.id,
      text: option.human_name
    };
  }

  /**
   * Returns the value_list object to be sent to the server on POST/PUT requests.
   *
   * @param valueList
   *
   * @returns {*}
   */
  toPayload(valueList: ValueListType) {
    // if duplicating a ValueList record, Qualifications payload will include IDs
    // of original record's Qualifications. remove IDs so we can create new ones
    const qualificationsPayload = Qualifications.toPayload(valueList);
    // eslint-disable-next-line no-param-reassign
    qualificationsPayload.qualifications?.forEach((q) => { delete q.id; });
    return {
        value_list: {
          ..._.pick(valueList, this.PAYLOAD_KEYS),
          ...qualificationsPayload
      }
    };
  }
}

export default new ValueList();
