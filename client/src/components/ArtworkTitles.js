// @flow

import React from 'react';
import { List } from 'semantic-ui-react';
import _ from 'underscore';
import Qualifiables from '../utils/Qualifiables';
import type { ArtworkTitle } from '../types/ArtworkTitle';
import './ArtworkTitles.css';

type Props = {
  items: Array<ArtworkTitle>
};

const ArtworkTitles = (props: Props) => {
  if (!props.items) {
    return null;
  }

  return (
    <List
      className='artwork-titles'
      divided
      relaxed
    >
      { _.map(props.items, (item) => (
        <List.Item>
          <List.Icon
            color={item.primary ? 'green' : 'white'}
            name='check circle'
            verticalAlign='middle'
          />
          <List.Content>
            <List.Header
              content={item.title}
            />
            <List.Description
              content={Qualifiables.getValueListValue(item, 'Artwork', 'Title Type')}
            />
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
};

export default ArtworkTitles;
