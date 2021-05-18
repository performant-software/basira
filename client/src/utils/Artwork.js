// @flow

import _ from 'underscore';

import type { Artwork } from '../types/Artwork';

/**
 * Returns the primary mage for the passed artwork.
 *
 * @param artwork
 *
 * @returns {string|*}
 */
const getPrimaryImage = (artwork: Artwork) => {
  const primary = _.find(artwork.attachments, { primary: true });
  return primary && primary.thumbnail_url;
};

/**
 * Returns the primary title for the passed artwork.
 *
 * @param artwork
 *
 * @returns {*}
 */
const getPrimaryTitle = (artwork: Artwork) => {
  const primary = _.find(artwork.artwork_titles, { primary: true });
  return primary && primary.title;
};

export default {
  getPrimaryImage,
  getPrimaryTitle
};
