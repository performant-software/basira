// @flow

import type { Qualifiable } from './concerns/Qualifiable';

export type Attachment = Qualifiable & {
  id: number,
  file?: File,
  file_url: string,
  primary: boolean,
  thumbnail_url: string,
  _destroy: boolean,
};
