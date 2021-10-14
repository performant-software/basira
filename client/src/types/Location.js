// @flow

import type { Artwork } from './Artwork';
import type { Person } from './Person';
import type { Qualification } from './Qualification';

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
  repository_work_url: string,
  qualifications: Array<Qualification>
};
