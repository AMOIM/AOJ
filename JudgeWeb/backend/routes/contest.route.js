import { Router } from 'express';
import Contest from '../controller/contest.contorller.js';

const router = Router();

router.get('/scoreboard/:id', Contest.getScoreboard);

export default router;