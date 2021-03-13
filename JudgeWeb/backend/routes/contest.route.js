import { Router } from 'express';
import Contest from '../controller/contest.controller.js';
import { authMiddlewareBackend } from '../middlewares/auth';

const router = Router();

router.get('/notice/:competitionNum', authMiddlewareBackend(), Contest.getNotice);
router.post('/notice/post', authMiddlewareBackend(), Contest.createPost);
router.post('/notice/reply', authMiddlewareBackend('admin'), Contest.createReply);

router.get('/scoreboard/:id', authMiddlewareBackend(), Contest.getScoreboard);
router.post('/status/:id', authMiddlewareBackend(), Contest.getStatus);

router.post('/create', authMiddlewareBackend('admin'), Contest.createContest);
router.get('/list', Contest.getContest);
router.get('/userlist/:id', authMiddlewareBackend(), Contest.getOne);
router.put('/update', authMiddlewareBackend('admin'), Contest.update);
router.delete('/delete/:id', authMiddlewareBackend('admin'), Contest.delete);

router.get('/:competitionNum', authMiddlewareBackend(), Contest.getProblemList);

export default router;