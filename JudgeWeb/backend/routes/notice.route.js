import { NoticeController } from '../controller/notice.controller.js';
import { Router } from 'express';

const router = Router();

router.get('/:competitionNum', NoticeController.getNotice);//contest/notice/competitionNum
router.post('/post', NoticeController.createPost);
router.post('/reply', NoticeController.createReply);

export default router;