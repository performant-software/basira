const SEARCH_HISTORY_KEY = 'basira_search_history';

/**
 * Clears the search history from session storage.
 */
const clearHistory = () => sessionStorage.removeItem(SEARCH_HISTORY_KEY);

/**
 * Returns the search history from session storage.
 *
 * @returns {any}
 */
const getHistory = () => JSON.parse(sessionStorage.getItem(SEARCH_HISTORY_KEY) || '[]');

/**
 * Saves the passed search history to session storage.
 *
 * @param url
 * @param query
 * @param items
 * @param created
 */
const saveSearch = ({ url, query, items, created }) => {
  const history = getHistory();

  history.push({
    url,
    query,
    items,
    created
  });

  sessionStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
};

export default {
  clearHistory,
  getHistory,
  saveSearch
};
