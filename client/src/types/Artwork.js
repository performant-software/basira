// @flow

import type { ArtworkTitle } from './ArtworkTitle';
import type { Attachable } from './concerns/Attachable';

export type Artwork = Attachable & {
  id: number,
  date_start: number,
  date_end: number,
  date_descriptor: string,
  height: number,
  width: number,
  depth: number,
  notes_external: string,
  notes_internal: string,
  published: boolean,
  repository_work_url: string,
  accession_number: string,

  artwork_titles: Array<ArtworkTitle>
};
