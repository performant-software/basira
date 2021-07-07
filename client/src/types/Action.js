// flow

import type { Qualification } from './Qualification';

export type Action = {
  id: number,
  document_id: number,
  notes: string,

  qualifications: Array<Qualification>
};
