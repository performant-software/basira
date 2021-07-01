// @flow

import NestedAttributes from './NestedAttributes';

import type { Participateable } from '../types/concerns/Participateable';

class Participations extends NestedAttributes {
  PARAM_NAME = 'participations';

  /**
   * Returns the participations payload keys.
   *
   * @returns {string[]}
   */
  getPayloadKeys() {
    return [
      'id',
      'person_id',
      'participateable_id',
      'participateable_type',
      'role',
      'subrole',
      'description',
      'certainty',
      'notes',
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
   * @param collection
   * @param participateable
   *
   * @returns {{}}
   */
  toPayload(participateable: Participateable, collection: string = this.PARAM_NAME) {
    return super.toPayload(participateable, collection);
  }
}

export default new Participations();
