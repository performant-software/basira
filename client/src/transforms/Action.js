// @flow

import uuid from 'react-uuid';
import _ from 'underscore';

import type { Action as ActionType } from '../types/Action';

class Action {
  /**
   * Returns a copy of the passed action striped of the identifier attributes.
   *
   * @param action
   *
   * @returns {*&{qualifications}}
   */
  toCopy(action: ActionType) {
    return {
      ..._.omit(action, 'id', 'uid'),
      qualifications: _.map(action.qualifications, (qualification) => ({
        ..._.omit(qualification, 'id', 'uid', '_destroy', 'qualifiable_id'),
        uid: uuid()
      }))
    };
  }

  /**
   * Returns the passed action as a dropdown option.
   *
   * @param action
   * @param attributes
   *
   * @returns {{[p: string]: *}}
   */
  toDropdown(action: ActionType, attributes: any = {}) {
    return {
      ...attributes,
      key: action.id,
      value: action.id,
      text: this.toLabel(action)
    };
  }

  /**
   * Returns the dropdown label for the passed action.
   *
   * @param action
   *
   * @returns {*}
   */
  toLabel(action: ActionType) {
    return _.map(action.value_lists, (v) => v.human_name).join(', ');
  }
}

export default new Action();
