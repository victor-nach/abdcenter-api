import { validationResult } from 'express-validator';

const validateResult = (req, res, next) => {
  const errors = validationResult(req);

  // if we have any errors
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({
        status: 'error',
        // return all custom message as an array
        error: errors.array().map((i) => i.msg),
      });
  }
  // else pass control to the next middleware
  return next();
};

export default validateResult;
