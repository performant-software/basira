// @flow

import type { Participation } from './Participation';

export type Person = {
  id: number,
  name: string,
  display_name: string,
  person_type: string,
  nationality: string,
  authorized_vocabulary: string,
  url: string,
  database_value: string,
  comment: string,
  part_of: number,
  same_as: number,

  participations: Array<Participation>
};
