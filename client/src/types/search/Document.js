// @flow

import type { Artwork } from './Artwork';

export type Document = {
  id: string,
  name: string,
  image_url: string,
  thumbnail_url: string,

  artwork: Artwork
};
