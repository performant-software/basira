// @flow

import type { ValueList } from './ValueList';

export type Qualification = {
  id: number,
  qualifiable_id: number,
  qualifiable_type: string,
  value_list_id: number,
  value_list: ValueList,
  form_field: string,
  notes: any,
  persistent: boolean
};
