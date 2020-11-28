import express from 'express';
const router =  express.Router();
import { UserController } from '../controller/user.controller.js';

router.post('/', UserController.get);
router.post('/update', UserController.update);
router.post('/login', UserController.login);
router.post('/signup', UserController.signup);


module.exports = router;