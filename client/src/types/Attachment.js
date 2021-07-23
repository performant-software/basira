// @flow

import type { Qualification } from './Qualification';

export type Attachment = {
  id: number,
  file?: File,
  file_url: string,
  primary: boolean,
  thumbnail_url: string,
  _destroy: boolean,

  qualifications: Array<Qualification>
};
