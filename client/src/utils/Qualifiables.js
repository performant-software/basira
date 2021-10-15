// @flow

import _ from 'underscore';

import type { Qualifiable } from '../types/concerns/Qualifiable';

/**
 * Returns the value list value for the passed qualifiable, object, and group.
 *
 * @param qualifiable
 * @param object
 * @param group
 *
 * @returns {*|string}
 */
const getValueListValue = (qualifiable: Qualifiable, object: string, group: string) => {
  const qualification = _.find(qualifiable.qualifications, (q) => (
    !q._destroy && _.isMatch(q, { value_list_group: group, value_list_object: object })
  ));
  return qualification && qualification.value_list && qualification.value_list.human_name;
};

export default {
  getValueListValue
};
