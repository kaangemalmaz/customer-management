/**
 * @class Customer
 * @property {number} id - Unique identifier for the customer
 * @property {string} firstName - Customer's first name
 * @property {string} lastName - Customer's last name
 * @property {string} nationalId - National identity number (e.g., Turkish TC Kimlik No)
 * @property {Date} registerDate - Date when the customer was registered
 */
export class Customer {
  constructor({ id, firstName, lastName, nationalId, registerDate }) {
    /**
     * @type {number}
     */
    this.id = id;

    /**
     * @type {string}
     */
    this.firstName = firstName;

    /**
     * @type {string}
     */
    this.lastName = lastName;

    /**
     * @type {string}
     */
    this.nationalId = nationalId;

    /**
     * @type {Date}
     */
    this.registerDate = registerDate;
  }
}
