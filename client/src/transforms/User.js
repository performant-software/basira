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
