// @flow

import _ from 'underscore';
import i18n from '../i18n/i18n';
import Number from './Number';

type Item = {
  depth: ?string,
  height: ?string,
  width: ?string
};

const DIMENSION_ATTRIBUTES = ['height', 'width', 'depth'];

/**
 * Validates the height, width, and depth attributes for the passed item.
 *
 * @param item
 *
 * @returns {{}}
 */
const validateDimensions = (item: Item) => {
  let validationErrors = {};

  _.each(DIMENSION_ATTRIBUTES, (attribute) => {
    const value = item[attribute];

    if (!(_.isEmpty(value) || Number.isNumeric(value))) {
      validationErrors = _.extend(validationErrors, {
        [attribute]: i18n.t('Validations.errors.dimensionNumeric', { name: i18n.t(`Validations.labels.${attribute}`) })
      });
    }
  });

  return validationErrors;
};

export default {
  validateDimensions
};
