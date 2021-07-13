// @flow

import type { Attachable } from './concerns/Attachable';

export type VisualContext = Attachable & {
  id: number,
  name: string,
  height: number,
  width: number,
  depth: number,
  beta: boolean
};
