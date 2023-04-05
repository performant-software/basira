// @flow

import NestedAttributes from './NestedAttributes';

/**
 * Class for handling transforming artwork_title records.
 */
class ArtworkTitles extends NestedAttributes {
  PARAM_NAME = 'artwork_titles';

  /**
   * Overrides the appendFormData function and defaults the collection name.
   *
   * @param formData
   * @param prefix
   * @param record
   * @param collection
   */
  appendFormData(formData: FormData, prefix: string, record: *, collection: string = this.PARAM_NAME) {
    super.appendFormData(formData, prefix, record, collection);
  }

  /**
   * Returns the artwork_titles payload keys.
   *
   * @returns {string[]}
   */
  getPayloadKeys() {
    return [
      'id',
      'title',
      'title_type',
      'notes',
      'primary',
      '_destroy'
    ];
  }
}

export default new ArtworkTitles();
