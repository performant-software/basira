// @flow

import { createContext } from 'react';

type SearchContextType = {
  search: ?string,
  setSearch: (search: ?string) => void
};

const SearchContext = createContext<SearchContextType>({
  search: null,
  setSearch: () => {}
});

export default SearchContext;
