import { check } from 'express-validator';

class ValidatorHelpers {
  /**
   * @static checkEmpty
   * @description checks if input field is empty
   * @param { array } route
   * @param { String } fields one or more input fields
   * @memberof ValidatorHelpers
   */
  static checkEmpty(route, ...fields) {
    fields.forEach((field) => {
      route.push(check(field).isLength({ min: 1 }).withMessage(`kindly put in the ${field}`));
    });
  }

  /**
   * @static checkAlphabets
   * @description checks if input field contains only alphabets
   * @param { array } route
   * @param { String } fields one or more input fields
   * @memberof ValidatorHelpers
   */
  static checkAlphabets(route, ...fields) {
    fields.forEach((field) => {
      route.push(check(field).trim().matches(/^[a-zA-Z ]+$/).withMessage(`The user's ${field} should only contain alphabets`));
    });
  }

  /**
   * @static noWhiteSpace
   * @description checks if input field contains any white space in between
   * @param { array } route
   * @param { String } fields one or more input fields
   * @memberof ValidatorHelpers
   */
  static noWhiteSpace(path, ...input) {
    input.forEach((element) => {
      path.push(check(element).trim().matches(/^\S{3,}$/).withMessage(`There should be no white spaces in the ${element} field`));
    });
  }

  /**
   * @static checkMaxLength
   * @description checks the required maximum length of characters for the input field
   * @param { Array } route
   * @param { Integer } length
   * @param { String } fields one or more input fields
   * @memberof ValidatorHelpers
   */
  static checkMaxLength(route, length, ...fields) {
    fields.forEach((field) => {
      route.push(check(field).trim().isLength({ max: length }).withMessage(`The user's ${field} must have a maximum of ${length} characters`));
    });
  }

  /**
   * @static checkMinLength
   * @description checks the required maximum length of characters for the input field
   * @param { Array } route
   * @param { Integer } length
   * @param { String } fields one or more input fields
   * @memberof ValidatorHelpers
   */
  static checkMinLength(path, length, ...input) {
    input.forEach((element) => {
      path.push(check(element).trim().isLength({ min: length }).withMessage(`You can't have less than ${length} characters in the ${element} field`));
    });
  }

  /**
   * @static checkNumber
   * @description checks that the input is a valid number
   * @param { Array } route
   * @param { String } fields one or more input fields
   * @memberof ValidatorHelpers
   */
  static checkNumber(path, ...input) {
    input.forEach((element) => {
      path.push(check(element).trim().isNumeric({ no_symbols: true }).withMessage(`${element} should be a valid number with no signs`));
    });
  }

  /**
   * @static checkEmail
   * @description checks for  a valid email address
   * @param { Array } route
   * @param { String } email
   * @memberof ValidatorHelpers
   */
  static checkEmail(route, email) {
    route.push(check(email).trim().isEmail().withMessage('please put in a valid email address'));
  }

  /**
   * @static checkUrl
   * @description checks for  a valid image Url
   * @param { Array } route
   * @param { String } url
   * @memberof ValidatorHelpers
   */
  static checkUrl(route, url) {
    route.push(check(url).trim().isURL().withMessage('please put in a valid image url'));
  }
}

export default ValidatorHelpers;
