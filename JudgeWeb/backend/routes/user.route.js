import express from 'express';
const router =  express.Router();
import { UserController } from '../controller/user.controller.js';
import { authMiddlewareBackend } from '../middlewares/auth.js';

router.get('/', authMiddlewareBackend('admin'), UserController.getAll);
router.get('/:id', authMiddlewareBackend(),UserController.get);
router.put('/update', authMiddlewareBackend(), UserController.update);
router.post('/login', UserController.login);
router.post('/signup', UserController.signUp);
router.delete('/delete', authMiddlewareBackend('admin'), UserController.delete);
router.delete('/delete/contest', authMiddlewareBackend('admin'), UserController.deleteContestUser);
router.patch('/approve', authMiddlewareBackend('admin'), UserController.approve);

module.exports = router;