// @flow

import React, { useEffect, useState } from 'react';
import { useDataList, useList, SORT_ASCENDING } from 'react-components';
import {
  Button,
  Divider,
  Grid,
  Header,
  Transition
} from 'semantic-ui-react';
import _ from 'underscore';
import Thumbnail from './Thumbnail';
import './ArtworksList.css';

import type { ListProps } from 'react-components/types';

type Sort = {
  value: string
};

type Props = ListProps & {
  perPage: number,
  onSort: (sortColumn: string, sortDirection: string, page: number) => void,
  sort: Array<Sort>,
  sortColumn: string,
  sortDirection: string
};

const ArtworksList = (props: Props) => {
  const [hoverIndex, setHoverIndex] = useState(-1);

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
    <Grid
      className='artworks-list'
    >
      { _.map(props.items, (item, index) => (
        <>
          <Grid.Row
            columns={2}
            key={index}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(-1)}
            verticalAlign='middle'
          >
            <Grid.Column
              width={2}
            >
              { item.primary_attachment && (
                <Thumbnail
                  src={item.primary_attachment.thumbnail_url}
                  style={{
                    height: '100px',
                    objectFit: 'cover',
                    width: '100px'
                  }}
                />
              )}
            </Grid.Column>
            <Grid.Column
              width={10}
            >
              <Header
                content={item.primary_title && item.primary_title.title}
                subheader={item.date_descriptor}
              />
            </Grid.Column>
            <Grid.Column
              width={3}
            >
              { props.actions && (
                <Transition
                  visible={hoverIndex === index}
                >
                  <Button.Group>
                    { _.map(props.actions, (action) => (
                      <Button
                        basic
                        icon={action.icon}
                        key={action.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          return action.onClick && action.onClick(item);
                        }}
                      />
                    ))}
                  </Button.Group>
                </Transition>
              )}
            </Grid.Column>
          </Grid.Row>
          { index < (props.perPage - 1) && (
            <Divider />
          )}
        </>
      ))}
    </Grid>
  );
};

export default useDataList(useList(ArtworksList));
