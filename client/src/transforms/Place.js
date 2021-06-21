// @flow

import BaseTransform from './BaseTransform';
import _ from 'underscore';

import type { Place as PlaceType } from '../types/Place';

/**
 * Class for handling transforming place records.
 */
class Place extends BaseTransform {
  /**
   * Returns the place payload keys.
   *
   * @returns {string[]}
   */
  getPayloadKeys() {
    return [
      'name',
      'place_type',
      'lat',
      'long',
      'city',
      'state',
      'country',
      'url',
      'database_value',
      'notes',
      'same_as',
      'part_of'
    ];
  }

  /**
   * Returns the place object to be sent on POST/PUT requests.
   *
   * @param place
   *
   * @returns {{place: *}}
   */
  toPayload(place: PlaceType) {
    return {
      place: _.pick(place, this.getPayloadKeys())
    };
  }
}

export default new Place();
