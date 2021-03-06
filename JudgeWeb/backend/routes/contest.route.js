import { Router } from 'express';
import Contest from '../controller/contest.controller.js';
import { authMiddlewareBackend } from '../middlewares/auth';

const router = Router();

router.get('/notice', authMiddlewareBackend(), Contest.getNotice);
router.post('/notice/post', authMiddlewareBackend(), Contest.createPost);
router.post('/notice/reply', authMiddlewareBackend('admin'), Contest.createReply);

router.get('/scoreboard/:id', authMiddlewareBackend(), Contest.getScoreboard);
router.get('/status/:id/:user', authMiddlewareBackend(), Contest.getStatus);

router.post('/create', authMiddlewareBackend('admin'), Contest.createContest);
router.get('/list', Contest.getContest);
router.get('/get/:id', authMiddlewareBackend('admin'), Contest.getOne);
router.get('/gettime/:id', Contest.getTime);
router.get('/userlist/:id', Contest.getUserList);
router.put('/update', authMiddlewareBackend('admin'), Contest.update);
router.delete('/delete/:id', authMiddlewareBackend('admin'), Contest.delete);

router.get('/:competitionNum', authMiddlewareBackend(), Contest.getProblemList);

export default router;