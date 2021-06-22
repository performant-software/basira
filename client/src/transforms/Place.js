// @flow

import _ from 'underscore';
import BaseTransform from './BaseTransform';
import Locations from './Locations';

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
   * Returns the passed place as a dropdown option.
   *
   * @param place
   *
   * @returns {{description: *, text: string, value: number, key: number}}
   */
  toDropdown(place: PlaceType) {
    return {
      key: place.id,
      value: place.id,
      text: place.name,
      description: _.compact([place.city, place.state, place.country]).join(', ')
    };
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
      place: {
        ..._.pick(place, this.getPayloadKeys()),
        ...Locations.toPayload(place)
      }
    };
  }
}

export default new Place();
