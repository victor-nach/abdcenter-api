import express from 'express';
import userRoutes from './userRoutes';
// import hallRoutes from './hallRoutes';

const router = express.Router();


router.use('/users', userRoutes);
// router.use('/halls', hallRoutes);

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'welcome to banka version 1.0',
  });
});

export default router;
