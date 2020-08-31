import { Router } from 'express';

import Problem from '../controller/problem.controller';

const router = Router();

router.post('/', Problem.get);
router.post('/submit', Problem.submit);

export default router;