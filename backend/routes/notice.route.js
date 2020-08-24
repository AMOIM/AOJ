import { NoticeController } from '../controller/notice.controller.js';
import { Router } from 'express';
import { logger } from '../config/winston.js';

const router = Router();

router.get('/:competitionNum', NoticeController.getNotice);//contest/notice/competitionNum
router.post('/create', NoticeController.createPost);
router.post('/reply', NoticeController.createReply);

export default router;