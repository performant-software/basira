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
    const { uid } = response.data.data;

    sessionStorage.setItem('user',
      JSON.stringify({
        'access-token': response.headers['access-token'],
        client: response.headers.client,
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
   * Returns true if the user is currently authenticated.
   *
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!sessionStorage.getItem('user');
  }
}

export default new Session();
