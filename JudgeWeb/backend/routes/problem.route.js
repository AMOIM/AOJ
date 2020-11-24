import { Router } from 'express';

import Problem from '../controller/problem.controller';

const router = Router();

router.post('/', Problem.get);
router.get('/list', Problem.getAll);
router.post('/submit', Problem.submit);
router.post('/create', Problem.create);

export default router;