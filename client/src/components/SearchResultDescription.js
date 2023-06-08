// @flow

import React from 'react';
import _ from 'underscore';
import { List } from 'semantic-ui-react';
import type { Artwork } from '../types/search/Artwork';

type Props = {
  artwork: Artwork
};

const NAME_SEPARATOR = ', ';

const SearchResultDescription = (props: Props) => {
  if (_.isEmpty(props.artwork.creators) && _.isEmpty(props.artwork.locations)) {
    return null;
  }

  return (
    <List>
      { !_.isEmpty(props.artwork.creators) && (
        <List.Item>
          <List.Icon
            name='paint brush'
          />
          <List.Content>
            { _.pluck(props.artwork.creators, 'display_name').join(NAME_SEPARATOR)}
          </List.Content>
        </List.Item>
      )}
      { !_.isEmpty(props.artwork.locations) && (
        <List.Item>
          <List.Icon
            name='map marker'
          />
          <List.Content>
            { _.pluck(props.artwork.locations, 'name').join(NAME_SEPARATOR)}
          </List.Content>
        </List.Item>
      )}
    </List>
  );
};

export default SearchResultDescription;
