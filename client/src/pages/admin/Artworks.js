// @flow

import React from 'react';
import { Image } from 'semantic-ui-react';
import ArtworksService from '../../services/Artworks';
import AdminItemList from '../../components/AdminItemList';
import './Artworks.css';

const Artworks = () => (
  <AdminItemList
    className='artworks'
    collectionName='artworks'
    renderHeader={(artwork) => artwork.title}
    renderImage={(artwork) => <Image src={artwork.image_url} />}
    renderMeta={(artwork) => artwork.date_descriptor}
    onDelete={(artwork) => ArtworksService.delete(artwork)}
    onLoad={(params) => ArtworksService.fetchAll(params)}
    onSave={(artwork) => ArtworksService.save(artwork)}
    route='artworks'
    sort={[{
      key: 'title',
      value: 'artwork_titles.title',
      text: 'Title'
    }, {
      key: 'date',
      value: 'date',
      text: 'Date'
    }]}
  />
);

export default Artworks;
