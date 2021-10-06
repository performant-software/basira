// @flow

import _ from 'underscore';
import BaseTransform from './BaseTransform';

import type { User as UserType } from '../types/User';

/**
 * Class for handling transforming person records.
 */
class User extends BaseTransform {
  /**
   * Returns the user payload keys.
   *
   * @returns {string[]}
   */
  getPayloadKeys() {
    return [
      'name',
      'email',
      'password',
      'password_confirmation'
    ];
  }

  /**
   * Returns the dropdown option for the passed user.
   *
   * @param user
   *
   * @returns {{text: string, value: number, key: number}}
   */
  toDropdown(user: UserType) {
    return {
      key: user.id,
      value: user.id,
      text: user.name
    };
  }

  /**
   * Returns the user object to be sent on POST/PUT requests.
   *
   * @param user
   *
   * @returns {{person: (*)}}
   */
  toPayload(user: UserType) {
    return {
      user: _.pick(user, this.getPayloadKeys())
    };
  }
}

export default new User();
