// @flow

import React from 'react';
import { Header, Icon, List } from 'semantic-ui-react';
import _ from 'underscore';
import type { ArtworkTitle } from '../types/ArtworkTitle';
import Qualifiables from '../utils/Qualifiables';
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
          <List.Content>
            <List.Header
              className='list-header'
              content={item.title}
            >
              <Header
                content={item.title}
                size='small'
              />
              { item.primary && (
                <Icon
                  color='green'
                  name='check circle'
                />
              )}
            </List.Header>
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
