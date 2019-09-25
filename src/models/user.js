import db from '../database/config';
import queries from '../database/queries';

const {
  insertUser, getSingleUser,
} = queries;

class User {
  /**
   * @static signup
   * @description creates a new user entry in the database
   * @param { String } firstName
   * @param { String } lastName
   * @param { String } email
   * @param { String } hashPassword
   * @param { String } role
   * @returns { Object } the created user details
   * @memberof User
   */
  static async signup(
    firstName, lastName, email, hashPassword, role,
  ) {
    const values = [
      email, firstName, lastName, hashPassword, role,
    ];
    const { rows } = await db.query(insertUser, values);
    return rows[0];
  }

  /**
   * @static signin
   * @description signs in a user
   * @param { String } email
   * @returns { Object } the signed in user details
   * @memberof User
   */
  static async getUser(email) {
    const values = [email];
    const { rows } = await db.query(getSingleUser, values);
    if (!rows[0]) {
      const error = new Error();
      error.name = 'email_null';
      throw error;
    }
    return rows[0];
  }
}

export default User;
