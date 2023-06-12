// @flow

import React from 'react';
import useStats from '../hooks/Stats';

const SearchStats = (props: any) => {
  const { nbHits, processingTimeMS } = useStats(props);

  return (
    <div>{ `${nbHits} results in ${(processingTimeMS / 1000.0).toFixed(2)} seconds`}</div>
  );
};

export default SearchStats;
