import express from 'express';
const router =  express.Router();
import { UserController } from '../controller/user.controller.js';
import authMiddleware from '../middlewares/auth.js';

router.post('/login', UserController.login);

router.use('/signup', authMiddleware);
router.post('/signup', UserController.signup);


module.exports = router;