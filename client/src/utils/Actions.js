// @flow

import _ from 'underscore';

import type { Action } from '../types/Action';

/**
 * Returns the value list value for the passed action, object, and group.
 *
 * @param action
 * @param object
 * @param group
 *
 * @returns {*|string}
 */
const getValueListValue = (action: Action, object: string, group: string) => {
  const qualification = _.find(action.qualifications, (q) => (
    !q._destroy && _.isMatch(q, { value_list_group: group, value_list_object: object })
  ));
  return qualification && qualification.value_list && qualification.value_list.human_name;
};

export default {
  getValueListValue
};
