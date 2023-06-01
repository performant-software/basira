// @flow

import React from 'react';
import { LazyImage } from 'react-components';
import { Item } from 'semantic-ui-react';
import _ from 'underscore';
import type { Artwork } from '../types/Artwork';

type Props = {
  artworks: Array<Artwork>
};

const Artworks = (props: Props) => {
  if (!props.artworks) {
    return null;
  }

  return (
    <Item.Group
      divided
      relaxed='very'
    >
      { _.map(props.artworks, (artwork) => (
        <Item>
          { artwork.primary_attachment && (
            <Item.Image>
              <LazyImage
                src={artwork.primary_attachment.thumbnail_url}
              />
            </Item.Image>
          )}
          <Item.Content>
            <Item.Header
              content={artwork.primary_title?.title}
            />
            <Item.Meta
              content={artwork.date_descriptor}
            />
            <Item.Description
              content={artwork.notes_external}
            />
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  );
};

export default Artworks;
