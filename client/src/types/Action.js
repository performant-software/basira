// flow

import type { Qualification } from './Qualification';
import type { ValueList } from './ValueList';

export type Action = {
  id: number,
  document_id: number,
  notes: string,

  qualifications: Array<Qualification>,
  value_lists: Array<ValueList>
};
