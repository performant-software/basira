// @flow

import React, { useState, type Node } from 'react';
import SearchContext from '../context/Search';

type Props = {
  children: Node
};

const SearchContextProvider = (props: Props) => {
  const [search, setSearch] = useState(null);

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch
      }}
    >
      { props.children }
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
