// @flow

import NestedAttributes from './NestedAttributes';

import type { Locateable } from '../types/concerns/Locateable';
import type { Place } from '../types/Place';

class Locations extends NestedAttributes {
  PARAM_NAME = 'locations';

  /**
   * Returns the locations payload keys.
   *
   * @returns {string[]}
   */
  getPayloadKeys() {
    return [
      'id',
      'place_id',
      'locateable_id',
      'locateable_type',
      'role',
      'subrole',
      'description',
      'certainty',
      'notes',
      'repository_work_url',
      '_destroy'
    ];
  }

  /**
   * Overrides the collection name.
   *
   * @param formData
   * @param prefix
   * @param record
   * @param collection
   */
  appendFormData(formData: FormData, prefix: string, record: any, collection: string = this.PARAM_NAME) {
    super.appendFormData(formData, prefix, record, collection);
  }

  /**
   * Overrides the collection name.
   *
   * @param locateable
   * @param collection
   *
   * @returns {{}}
   */
  toPayload(locateable: Locateable | Place, collection: string = this.PARAM_NAME) {
    return super.toPayload(locateable, collection);
  }
}

export default new Locations();
