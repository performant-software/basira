// @flow

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useCurrentRefinements, useSearchBox } from 'react-instantsearch-hooks-web';
import { useLocation } from 'react-router-dom';
import _ from 'underscore';
import SearchHistoryService from '../services/SearchHistory';
import useFacetLabels from '../hooks/FacetLabels';

const LoadStatus = {
  initial: 0,
  firstRender: 1,
  rendered: 2
};

const SearchHistory = () => {
  const currentRefinements = useCurrentRefinements();
  const { query } = useSearchBox();

  const location = useLocation();
  const { getLabel } = useFacetLabels();

  const { search: url } = location;

  const loadState = useRef({
    status: LoadStatus.initial
  });

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
   * On initial render, we may need to wait for the query and refinements to be loaded into the state before
   * pushing into the search history.
   */
  useEffect(() => {
    const { hasQuery, hasRefinements, status } = loadState.current

    if (status === LoadStatus.firstRender) {
      if ((hasQuery && !_.isEmpty(query) || (hasRefinements && !_.isEmpty(items)))) {
        SearchHistoryService.saveSearch({ url, query, items, created: Date.now() });

        loadState.current = {
          status: LoadStatus.rendered
        };
      }

      if (!(hasQuery || hasRefinements)) {
        loadState.current = {
          status: LoadStatus.rendered
        };
      }
    }
  }, [query, items]);

  /**
   * After the initial render, use the URL to determine if we should push into the search history.
   */
  useEffect(() => {
    const { status } = loadState.current;

    if (status === LoadStatus.rendered && !(_.isEmpty(query) && _.isEmpty(items))) {
      SearchHistoryService.saveSearch({ url, query, items, created: Date.now() });
    }
  }, [url]);

  /**
   * On initial render, the URL is set before the query/refinements are loaded into the state. When the component
   * is mounted, we'll keep track of whether the URL search contains a query/refinements and wait for them to
   * be loaded into the state before pushing to the search history.
   */
  useEffect(() => {
    let hasQuery = false;
    let hasRefinements = false;

    if (!_.isEmpty(url)) {
      hasQuery = url.includes('query');
      hasRefinements = url.includes('refinementList');
    }

    loadState.current = {
      hasQuery,
      hasRefinements,
      status: LoadStatus.firstRender
    };
  }, []);

  return null;
};

export default SearchHistory;