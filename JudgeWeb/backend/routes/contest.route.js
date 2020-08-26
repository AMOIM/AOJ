import { Router } from 'express';
import Contest from '../controller/contest.controller.js';

const router = Router();


router.get('/notice/:competitionNum', Contest.getNotice);
router.post('/notice/post', Contest.createPost);
router.post('/notice/reply', Contest.createReply);

export default router;