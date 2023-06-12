// @flow

import { DropdownButton } from '@performant-software/semantic-components';
import React from 'react';
import { useHitsPerPage } from 'react-instantsearch-hooks-web';
import _ from 'underscore';

type Props = {
  options: Array<number>
};

const SearchResultsPerPage = ({ options }: Props) => {
  const { items, refine } = useHitsPerPage({
    items: _.map(options, (option, index) => ({
      label: option,
      value: option,
      default: index === 0
    }))
  });

  const { value } = _.findWhere(items, { isRefined: true });

  return (
    <DropdownButton
      basic
      icon='list'
      onChange={(e, data) => refine(data.value)}
      options={_.map(items, (item) => ({
        key: item.value,
        value: item.value,
        text: item.label
      }))}
      text={`Show ${value}`}
      value={value}
    />
  );
};

export default SearchResultsPerPage;
