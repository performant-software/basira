// @flow

/**
 * Service class responsible for all session based functions.
 */
class Session {
  /**
   * Creates a new session based on the passed response.
   *
   * @param response
   */
  create(response: any) {
    const { name, uid } = response.data.data;

    sessionStorage.setItem('user',
      JSON.stringify({
        'access-token': response.headers['access-token'],
        client: response.headers.client,
        name,
        uid
      }));
  }

  /**
   * Removes the current session.
   */
  destroy() {
    sessionStorage.removeItem('user');
  }

  /**
   * Returns the name of the current user.
   *
   * @returns {*}
   */
  getName() {
    const userString = sessionStorage.getItem('user') || '{}';
    const user = JSON.parse(userString);

    return user.name;
  }

  /**
   * Returns true if the user is currently authenticated.
   *
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!sessionStorage.getItem('user');
  }
}

export default new Session();
