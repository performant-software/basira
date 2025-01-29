// @flow

/**
 * Returns the date/time view for the passed date string.
 *
 * @param timestamp
 *
 * @returns {`${string} ${string}`}
 */
export const getDateTimeView = (timestamp) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};
