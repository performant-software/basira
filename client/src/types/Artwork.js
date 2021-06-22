// @flow

import type { ArtworkTitle } from './ArtworkTitle';
import type { Attachable } from './concerns/Attachable';
import type { Locateable } from './concerns/Locateable';
import type { Participateable } from './concerns/Participateable';

export type Artwork = Attachable & Locateable & Participateable & {
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

  artwork_titles: Array<ArtworkTitle>,
  primary_title: ArtworkTitle
};
