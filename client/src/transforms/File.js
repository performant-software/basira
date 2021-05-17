// @flow

import { v4 } from 'uuid';

/**
 * Class for handling transforming Javascript file objects.
 */
class File {
  /**
   * Converts the passed file to an attachment object.
   *
   * @param file
   *
   * @returns Attachment
   */
  toAttachment(file: any) {
    return {
      uid: v4(),
      name: file.name,
      size: file.size,
      file,
      file_url: URL.createObjectURL(file)
    };
  }
}

export default new File();
