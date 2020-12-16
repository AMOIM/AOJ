import { Router } from 'express';
import Markdown from '../controller/markdown.controller.js';

const router = Router();

router.post('/create', Markdown.create);
router.get('/get', Markdown.get);

export default router;