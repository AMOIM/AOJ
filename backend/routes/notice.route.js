import {NoticeController} from '../controller/notice.controller.js';
import {Router} from 'express';
import { logger } from '../config/winston.js';

const router = Router();

router.post('/create', NoticeController.createPost);

export default router;