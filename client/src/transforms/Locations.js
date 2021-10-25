// @flow

import _ from 'underscore';
import NestedAttributes from './NestedAttributes';
import Qualifications from './Qualifications';

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
    _.each(record[collection], (location, index) => {
      Qualifications.appendFormData(formData, `${prefix}[locations][${index}]`, location);
    });
    super.appendFormData(formData, prefix, record, collection);
  }

  /**
   * Returns the locateable object to be sent to the server on POST/PUT requests.
   *
   * @param locateable
   * @param collection
   *
   * @returns {{}}
   */
  toPayload(locateable: Locateable | Place, collection: string = this.PARAM_NAME) {
    const payload = super.toPayload(locateable, collection);
    const newLocationsPayload = _.map(locateable[collection], (location) => {
      const payloadLocation = payload[collection].find((loc) => loc.id === location.id);
      return { ...payloadLocation, ...Qualifications.toPayload(location) };
    });
    payload[collection] = newLocationsPayload;
    return payload;
  }
}

export default new Locations();
