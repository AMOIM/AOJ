import { Router } from 'express';
import Contest from '../controller/contest.contorller.js';

const router = Router();

router.get('/scoreboard/:id', Contest.getScoreboard);
router.post('/status/:id', Contest.getStatus);

export default router;