import { Router } from 'express';
<<<<<<< HEAD
import Contest from '../controller/contest.controller.js';

const router = Router();


router.get('/notice/:competitionNum', Contest.getNotice);
router.post('/notice/post', Contest.createPost);
router.post('/notice/reply', Contest.createReply);
=======
import Contest from '../controller/contest.contorller.js';

const router = Router();

router.get('/scoreboard/:id', Contest.getScoreboard);
router.post('/status/:id', Contest.getStatus);
>>>>>>> a5ba12f885930c30a8588118539b18a6eff262a1

export default router;