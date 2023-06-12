// @flow

import { LinkButton } from '@performant-software/semantic-components';
import React, { useEffect } from 'react';
import {
  Checkbox,
  Icon,
  Label,
  List
} from 'semantic-ui-react';
import _ from 'underscore';
import { useRefinementList } from 'react-instantsearch-hooks-web';
import Facet, { type Props as FacetProps } from './Facet';

type Props = FacetProps & {
  defaultValue?: string
};

const FacetList = (props: Props) => {
  const {
    items,
    refine,
    canToggleShowMore,
    isShowingMore,
    toggleShowMore,
  } = useRefinementList(props);

  /**
   * Sets the default value if provided.
   */
  useEffect(() => {
    if (props.defaultValue) {
      refine(props.defaultValue);
    }
  }, [props.defaultValue]);

  if (_.isEmpty(items)) {
    return null;
  }

  return (
    <Facet
      defaultActive={props.defaultActive}
      divided={props.divided}
      title={props.title}
    >
      <List
        className='facet-list'
      >
        { _.map(items, (item, index) => (
          <List.Item
            key={index}
          >
            <Checkbox
              checked={item.isRefined}
              label={{
                children: (
                  <>
                    <span>{ item.label }</span>
                    <Label
                      circular
                      content={item.count}
                      size='small'
                    />
                  </>
                )
              }}
              onClick={() => refine(item.value)}
            />
          </List.Item>
        ))}
      </List>
      { canToggleShowMore && (
        <>
          <Icon
            name={isShowingMore ? 'angle up' : 'angle down'}
          />
          {/* TODO: Resource me*/}
          <LinkButton
            content={isShowingMore ? 'Show Less' : 'Show More'}
            onClick={() => toggleShowMore()}
          />
        </>
      )}
    </Facet>
  );
};

export default FacetList;
