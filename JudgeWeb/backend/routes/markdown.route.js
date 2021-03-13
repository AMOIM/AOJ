import { Router } from 'express';
import Markdown from '../controller/markdown.controller.js';
import { authMiddlewareBackend } from '../middlewares/auth.js';

const router = Router();

router.post('/create', authMiddlewareBackend('admin'), Markdown.create);
router.get('/get', Markdown.get);

export default router;