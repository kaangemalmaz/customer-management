/**
 * @class User
 * @property {number} id
 * @property {string} username
 * @property {string} passwordHash
 */
export class User {
  constructor({ id, username, passwordHash }) {
    /**
     * @type {number}
     */
    this.id = id;

    /**
     * @type {string}
     */
    this.username = username;

    /**
     * @type {string}
     */
    this.passwordHash = passwordHash;
  }
}
