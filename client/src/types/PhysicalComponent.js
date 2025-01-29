// @flow

import type { Attachable } from './concerns/Attachable';

export type PhysicalComponent = Attachable & {
  id: number,
  name: string,
  height: number,
  width: number,
  depth: number,
  created_by_id: number
};
