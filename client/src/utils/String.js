// @flow

import _ from 'underscore';

const toString = (value: any) => {
  if (_.isNumber(value) || _.isBoolean(value)) {
    return value;
  }

  return value || '';
};

const truncate = (value: string, length: number) => {
  let truncated = '';

  if (value && value.length <= length) {
    truncated = value;
  } else if (value) {
    truncated = `${value.slice(0, length)}...`;
  }

  return truncated;
};

export default {
  toString,
  truncate
};
