import { Router } from 'express';
import Problem from '../controller/problem.controller.js';
import Judge from '../controller/judge.controller.js';

const router = Router();

router.post('/problem', Problem.get);
router.post('/problem/submit', Problem.submit);
router.get('/judge', Judge.run);

export default router;