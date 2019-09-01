import express from 'express';
import userController from '../controllers/userController';
import userValidations from '../middleware/validations/userValidations';
import validateResult from '../middleware/validations/validateResult';
import Auth from '../middleware/authentication/auth';

// const { verifyToken, verifyAdmin } = Auth;
const { signUp, signIn, getUser } = userController;

const router = express.Router();

const {
  checkSignUp, checkSignIn,
} = userValidations;

router.post(
  '/signup',
  checkSignUp,
  validateResult,
//   verifyToken,
//   verifyAdmin,
  signUp,
);
router.post(
  '/signin',
  checkSignIn,
  validateResult,
  signIn,
);

router.get(
  '/:email',
//   verifyToken,
//   verifyAdmin,
  getUser,
);


export default router;
