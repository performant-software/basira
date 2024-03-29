// @flow

import type { Qualifiable } from './concerns/Qualifiable';
import type { Artwork } from './Artwork';
import type { Person } from './Person';

export type Location = Qualifiable & {
  id: number,
  place_id: number,
  locateable_id: number,
  locateable_type: string,
  locateable: Artwork | Person,
  description: string,
  certainty: number,
  notes: string,
  repository_work_url: string
};
