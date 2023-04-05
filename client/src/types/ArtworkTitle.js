// @flow
import type { Qualifiable } from './concerns/Qualifiable';

export type ArtworkTitle = Qualifiable & {
  id: number,
  title: string,
  notes: string,
  primary: boolean
};
