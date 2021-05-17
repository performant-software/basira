// @flow

export type Attachment = {
  id: number,
  file?: File,
  file_url: string,
  primary: boolean,
  _destroy: boolean
};
