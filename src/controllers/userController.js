import User from '../models/user';
import utils from '../utils';
import ResponseMsg from '../utils/responseMsg';

const { response, responseErr } = ResponseMsg;

class UserController {
  /**
   * @static
   * @name Signin
   * @description allows the admin create a new user
   * @returns response object
   * @param { Object} req
   * @param { Object } res
   * @memberof UserController
   */
  static async signUp(req, res) {
    const {
      firstName, lastName, email, password, role,
    } = req.body;
    const hashPassword = utils.hashPassword(password);
    try {
      const user = await User.signup(
        firstName, lastName, email, hashPassword, role,
      );
      const token = await utils.generateToken({
        id: user.id,
        role,
      });
      return response(res, 201, {
        token, ...user,
      });
    } catch (error) {
      if (error.constraint === 'users_email_key') {
        return responseErr(res, 409, 'Kindly use another email, this email address has already been used');
      }
      return responseErr(res, 500, 'Internal server error');
    }
  }

  /**
   * @static
   * @name Signin
   * @description signs a usser in and generate token
   * @param { Object} req
   * @param { Object } res
   * @returns response object
   * @memberof UserController
   */
  static async signIn(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.getUser(email);
      const token = await utils.generateToken({ id: user.id, role: user.role });
      if (utils.comparePassword(password, user.hashedPassword) === true) {
        return response(res, 200, {
          token, ...user,
        });
      }
      return responseErr(res, 403, 'the password you have entered is invalid');
    } catch (error) {
      if (error.name === 'email_null') {
        return responseErr(res, 404, 'this email has been not been registered on this platform');
      }
      return responseErr(res, 500, 'Internal server error');
    }
  }

  /**
   * @static
   * @name Signin
   * @description signs a usser in and generate token
   * @param { Object} req
   * @param { Object } res
   * @returns response object
   * @memberof UserController
   */
  static async getUser(req, res) {
    const { email } = req.params;
    try {
      const user = await User.getUser(email);
      return response(res, 200, { ...user });
    } catch (error) {
      if (error.name === 'email_null') {
        return responseErr(res, 404, 'this email has been not been registered on this platform');
      }
      return responseErr(res, 500, 'Internal server error');
    }
  }
}

export default UserController;
