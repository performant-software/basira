// @flow

import type { Artwork } from './Artwork';
import type { Person } from './Person';

export type Location = {
  id: number,
  place_id: number,
  locateable_id: number,
  locateable_type: string,
  locateable: Artwork | Person,
  role: string,
  subrole: string,
  description: string,
  certainty: number,
  notes: string,
  repository_work_url: string
};
