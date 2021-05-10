// @flow

import React from 'react';
import ArtworksService from '../../services/Artworks';
import useEditPage from './EditPage';

const Artwork = (props) => (
  <div>Artwork edit page</div>
);

export default useEditPage(Artwork, {
  onLoad: (id) => ArtworksService.fetchOne(id).then(({ data }) => data.artwork),
  onSave: (artwork) => ArtworksService.save(artwork)
});
