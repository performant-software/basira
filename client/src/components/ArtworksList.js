// @flow

import React, { useEffect } from 'react';
import {
  useDataList, useList, SORT_ASCENDING, ItemCollection
} from 'react-components';
import {
  Header,
} from 'semantic-ui-react';
import _ from 'underscore';
import Thumbnail from './Thumbnail';
import './ArtworksList.css';

import type { ListProps } from 'react-components/types';

type Sort = {
  value: string
};

type Props = ListProps & {
  onSort: (sortColumn: string, sortDirection: string, page: number) => void,
  sort: Array<Sort>,
  sortColumn: string,
  sortDirection: string
};

const ArtworksList = (props: Props) => {
  /**
   * Sorts the list by the selected sort column.
   */
  useEffect(() => {
    const { page, sortDirection = SORT_ASCENDING } = props;

    let { sortColumn } = props;

    if (!sortColumn) {
      const defaultSort = _.first(props.sort);
      sortColumn = defaultSort && defaultSort.value;
    }

    props.onSort(sortColumn, sortDirection, page);
  }, []);

  return (
    <ItemCollection
      actions={_.filter(props.actions, (action) => action.name !== 'add')}
      className='artworks-list'
      items={props.items}
      renderHeader={(item) => item.primary_title && item.primary_title.title && (
        <Header
          as='h3'
          content={item.primary_title && item.primary_title.title}
        />
      )}
      renderImage={(item) => item.primary_attachment && (
        <Thumbnail
          src={item.primary_attachment.thumbnail_url}
          style={{ width: '100%' }}
        />
      )}
      renderMeta={(item) => item.date_descriptor}
    />
  );
};

export default useDataList(useList(ArtworksList));
