// @flow

import type { ArtworkTitle as ArtworkTitleType } from '../types/ArtworkTitle';
import _ from 'underscore';
import uuid from 'react-uuid';

class ArtworkTitle {
  /**
   * Returns a copy of the passed artwork_title with any ID values removed. This function also generates a new
   * UUID value.
   *
   * @param title
   *
   * @returns {*&{qualifications: *}}
   */
  toCopy(title: ArtworkTitleType) {
    return {
      ..._.omit(title, 'id', 'uid'),
      qualifications: _.map(title.qualifications, (qualification) => ({
        ..._.omit(qualification, 'id', 'uid', '_destroy', 'qualifiable_id'),
        uid: uuid()
      }))
    };
  }
}

export default new ArtworkTitle();