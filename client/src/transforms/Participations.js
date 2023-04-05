// @flow

import NestedAttributes from './NestedAttributes';
import Qualifications from './Qualifications';
import _ from 'underscore';
import String from '../utils/String';

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
    _.each(record[collection], (item, index) => {
      _.each(this.getPayloadKeys(), (key) => {
        formData.append(`${prefix}[${collection}][${index}][${key}]`, String.toString(item[key]));
      });

      Qualifications.appendFormData(formData, `${prefix}[${this.PARAM_NAME}][${index}]`, item);
    });
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
