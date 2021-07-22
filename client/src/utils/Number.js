// @flow

/**
 * Returns true if the passed string value is numeric.
 *
 * @param value
 *
 * @returns {""|number|boolean}
 */
const isNumeric = (value: ?string) => value && value.length && !Number.isNaN(parseInt(value, 10));

export default {
  isNumeric
};
