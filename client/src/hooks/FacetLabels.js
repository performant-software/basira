// @flow

import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const PREFIX = 'Search.facets.';
const FACET_SUFFIX = '_facet';
const LABEL_REGEX = /([-_][a-z])/g;

const useFacetLabels = () => {
  const { t } = useTranslation();

  /**
   * Returns the resource label key for the passed facet attribute.
   *
   * @type {function(string): string}
   */
  const getLabelKey = useCallback((attribute: string) => (
    attribute
      .toLowerCase()
      .replace(FACET_SUFFIX, '')
      .replace(LABEL_REGEX, (group) => (
        group
          .toUpperCase()
          .replace('-', '')
          .replace('_', '')
      ))
  ), []);

  /**
   * Returns the resource label for the passed facet attribute.
   *
   * @type {function(string): string}
   */
  const getLabel = useCallback((attribute: string) => {
    const key = `${PREFIX}${getLabelKey(attribute)}`;
    return t(key);
  }, [getLabelKey, t]);

  return {
    getLabel
  };
};

export default useFacetLabels;
