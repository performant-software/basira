// @flow

import { useCallback, useEffect, useMemo } from 'react';
import { useCurrentRefinements, useSearchBox } from 'react-instantsearch-hooks-web';
import { useLocation } from 'react-router-dom';
import _ from 'underscore';
import SearchHistoryService from '../services/SearchHistory';
import useFacetLabels from '../hooks/FacetLabels';

const SearchHistory = () => {
  const currentRefinements = useCurrentRefinements();
  const { query } = useSearchBox();

  const location = useLocation();
  const { getLabel } = useFacetLabels();

  const { search: url } = location;

  /**
   * Retrieves the label and facet value from the current refinements.
   *
   * @type {function(*): *}
   */
  const transformItem = useCallback((item) => (
    _.map(item.refinements, (r) => `${getLabel(r.attribute)}: ${r.label}`)
  ), [getLabel]);

  /**
   * Transforms the list of items into an array of label/values.
   */
  const items = useMemo(() => _.flatten(_.map(currentRefinements.items, transformItem)), [currentRefinements]);

  /**
   * Saves the search whenever the URL is changed.
   */
  useEffect(() => {
    if (!(_.isEmpty(query) && _.isEmpty(items))) {
      SearchHistoryService.saveSearch({ url, query, items, created: Date.now() });
    }
  }, [location.search]);

  return null;
};

export default SearchHistory;