// flow

import type { Qualifiable } from './concerns/Qualifiable';
import type { ValueList } from './ValueList';

export type Action = Qualifiable & {
  id: number,
  document_id: number,
  notes: string,

  value_lists: Array<ValueList>
};
