// @flow

import _ from 'underscore';

import type { Location } from '../types/Location';

/**
 * Returns the value list value for the passed location, object, and group.
 *
 * @param location
 * @param object
 * @param group
 *
 * @returns {*|string}
 */
const getValueListValue = (location: Location, object: string, group: string) => {
  const qualification = _.find(location.qualifications, (q) => (
    !q._destroy && _.isMatch(q, { value_list_group: group, value_list_object: object })
  ));
  return qualification && qualification.value_list && qualification.value_list.human_name;
};

export default {
  getValueListValue
};
