// @flow

import type { Locateable } from './concerns/Locateable';
import type { Participation } from './Participation';
import type { Qualifiable } from './concerns/Qualifiable';

export type Person = Locateable & Qualifiable & {
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
