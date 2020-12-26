import express from 'express';
const router =  express.Router();
import { UserController } from '../controller/user.controller.js';

router.post('/', UserController.get);
router.put('/update', UserController.update);
router.post('/login', UserController.login);
router.post('/signup', UserController.signup);
router.delete('/delete', UserController.delete);
router.delete('/delete/contest', UserController.deleteContestUser);


module.exports = router;