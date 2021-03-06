import utils from '../../utils';
import ResponseMsg from '../../utils/responseMsg';

const { responseErr } = ResponseMsg;

class Auth {
  /**
   * @static verifyToken
   * @param { Object } req
   * @param { Object } res
   * @param { Object } next
   * @returns response object with error messages or passes control to the next function
   * @description checks if the token is provided, valid or invalid
   * @memberof Auth
   */
  static async verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return responseErr(res, 401, 'invalid request, token missing');
    }
    try {
      const payload = await utils.decodeToken(token.split(' ')[1]);
      req.user = { ...payload };
      return next();
    } catch (error) {
      return responseErr(res, 401, 'the token you have provided is invalid');
    }
  }

  /**
   * @static verifyAdmin
   * @param { Object } req
   * @param { Object } res
   * @param { Object } next
   * @returns response object with error messages or passes control to the next function
   * @description checks if the token is valid for staffs
   * @memberof Auth
   */
  static async verifyStaff(req, res, next) {
    if (req.user.userType !== 'staff') {
      return responseErr(res, 401, `unauthorized access(${req.user.userType}), you need to be a staff`);
    }
    return next();
  }

  /**
   * @static verifyToken
   * @param { Object } req
   * @param { Object } res
   * @param { Object } next
   * @returns response object with error messages or passes control to the next function
   * @description checks if the token is valid for admins
   * @memberof Auth
   */
  static async verifyAdmin(req, res, next) {
    if (req.user.isAdmin !== true) {
      return responseErr(res, 401, `unauthorized access(${req.user.userType}), you need to be an Admin`);
    }
    return next();
  }
}

export default Auth;
