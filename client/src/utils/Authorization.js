// @flow

import i18n from '../i18n/i18n';

const STATUS_UNAUTHORIZED = 401;

type ErrorType = {
  response: {
    status: number
  }
};

/**
 * Resolves the error message from a DELETE request.
 *
 * @param error
 *
 * @returns {[]}
 */
const resolveDeleteError = (error: ErrorType) => {
  const errors = [];

  const { status } = error.response;
  if (status === STATUS_UNAUTHORIZED) {
    errors.push(i18n.t('Common.errors.unauthorized'));
  }

  return errors;
};

type ResolveUpdateErrorType = {
  status: number
};

/**
 * Resolve the error message from a PUT request.
 *
 * @param status
 *
 * @returns {[]}
 */
const resolveUpdateError = ({ status }: ResolveUpdateErrorType) => {
  const errors = [];

  if (status === STATUS_UNAUTHORIZED) {
    errors.push(i18n.t('Common.errors.unauthorized'));
  }

  return errors;
};

export default {
  resolveDeleteError,
  resolveUpdateError
};
