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
    const { name, uid, admin } = response.data.data;

    sessionStorage.setItem('user',
      JSON.stringify({
        'access-token': response.headers['access-token'],
        client: response.headers.client,
        name,
        uid,
        admin
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
    const user = this.parseUser();
    return user.name;
  }

  /**
   * Returns true if the currently logged in user is an admin.
   *
   * @returns {*}
   */
  isAdmin() {
    const user = this.parseUser();
    return user.admin;
  }

  /**
   * Returns true if the user is currently authenticated.
   *
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!sessionStorage.getItem('user');
  }

  // private

  /**
   * Parses the session storage user.
   *
   * @returns {*}
   */
  parseUser() {
    return JSON.parse(sessionStorage.getItem('user') || '{}');
  }
}

export default new Session();
