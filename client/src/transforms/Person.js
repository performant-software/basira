// @flow

import _ from 'underscore';
import BaseTransform from './BaseTransform';
import Locations from './Locations';
import Participations from './Participations';

import type { Person as PersonType } from '../types/Person';

/**
 * Class for handling transforming person records.
 */
class Person extends BaseTransform {
  /**
   * Returns the person payload keys.
   *
   * @returns {string[]}
   */
  getPayloadKeys() {
    return [
      'name',
      'display_name',
      'person_type',
      'nationality',
      'authorized_vocabulary',
      'url',
      'database_value',
      'comment',
      'part_of',
      'same_as'
    ];
  }

  /**
   * Returns the passed person as a dropdown option.
   *
   * @param person
   *
   * @returns {{text: string, value: number, key: number}}
   */
  toDropdown(person: PersonType) {
    return {
      key: person.id,
      value: person.id,
      text: person.display_name
    };
  }

  /**
   * Returns the person object to be sent on POST/PUT requests.
   *
   * @param person
   *
   * @returns {{person: (*)}}
   */
  toPayload(person: PersonType) {
    return {
      person: {
        ..._.pick(person, this.getPayloadKeys()),
        ...Locations.toPayload(person),
        ...Participations.toPayload(person)
      }
    };
  }
}

export default new Person();
