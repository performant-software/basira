// @flow

import type { Person } from './Person';
import type { Place } from './Place';

export type Artwork = {
  id: string,
  name: string,
  image_url: string,
  image_urls: Array<string>,

  creators: Array<Person>,
  locations: Array<Place>
};
