// @flow

import React, { useEffect, useState } from 'react';
import { useDataList, useList, SORT_ASCENDING } from 'react-components';
import {
  Accordion,
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  Transition
} from 'semantic-ui-react';
import _ from 'underscore';

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

const ArtworksAccordion = (props: Props) => {
  const [activeIndexes, setActiveIndexes] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(-1);

  useEffect(() => {
    const { page, sortDirection = SORT_ASCENDING } = props;

    let { sortColumn } = props;

    if (!sortColumn) {
      const defaultSort = _.first(props.sort);
      sortColumn = defaultSort && defaultSort.value;
    }

    props.onSort(sortColumn, sortDirection, page);
  }, []);

  const isActive = (index) => _.contains(activeIndexes, index);

  const onItemClick = (item, index) => {
    if (isActive(index)) {
      setActiveIndexes((prevActive) => _.filter(prevActive, (i) => i !== index));
    } else {
      setActiveIndexes((prevActive) => [...prevActive, index]);
    }
  };

  return (
    <Accordion
      as={Grid}
      fluid
      style={{
        marginTop: '1em'
      }}
    >
      { _.map(props.items, (item, index) => (
        <>
          <Accordion.Title
            active={isActive(index)}
            as={Grid.Row}
            columns={3}
            index={index}
            onClick={onItemClick.bind(this, item, index)}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(-1)}
            verticalAlign='middle'
          >
            <Grid.Column
              width={2}
            >
              { item.primary_attachment && (
                <Image
                  src={item.primary_attachment.file_url}
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
            <Grid.Column
              width={1}
            >
              <Icon
                name={isActive(index) ? 'angle down' : 'angle right'}
                size='big'
                style={{
                  color: 'rgba(0, 0, 0, 0.6)'
                }}
              />
            </Grid.Column>
          </Accordion.Title>
          <Transition
            duration={200}
            visible={isActive(index)}
          >
            <Accordion.Content
              active={isActive(index)}
              as={Grid.Row}
              columns={2}
            >
              <Grid.Column
                width={2}
              />
              <Grid.Column
                width={14}
              >
                Child content!
              </Grid.Column>
            </Accordion.Content>
          </Transition>
          { index < (props.perPage - 1) && (
            <Divider />
          )}
        </>
      ))}
    </Accordion>
  );
};

export default useDataList(useList(ArtworksAccordion));
