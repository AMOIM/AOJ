import { Router } from 'express';
import Contest from '../controller/contest.controller.js';

const router = Router();

router.get('/:competitionNum', Contest.getProblemList);

router.get('/notice/:competitionNum', Contest.getNotice);
router.post('/notice/post', Contest.createPost);
router.post('/notice/reply', Contest.createReply);

router.get('/scoreboard/:id', Contest.getScoreboard);
router.post('/status/:id', Contest.getStatus);

export default router;