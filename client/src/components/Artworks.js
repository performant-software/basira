// @flow

import React from 'react';
import { LazyImage } from 'react-components';
import { Item } from 'semantic-ui-react';
import _ from 'underscore';
import CertaintyLabel from './CertaintyLabel';
import type { Participation } from '../types/Participation';

type Props = {
  items: Array<Participation>
};

const Artworks = (props: Props) => {
  if (!props.items) {
    return null;
  }

  return (
    <Item.Group
      divided
      relaxed='very'
    >
      { _.map(props.items, (item) => (
        <Item>
          <Item.Image>
            <LazyImage
              src={item.participateable?.primary_attachment?.thumbnail_url}
            />
          </Item.Image>
          <Item.Content>
            <Item.Header
              content={item.participateable?.primary_title?.title}
            />
            <Item.Meta
              content={item.participateable?.date_descriptor}
            />
            <Item.Description
              content={item.notes_external}
            />
            <Item.Extra>
              <CertaintyLabel
                value={item.certainty}
              />
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
};

export default Artworks;
