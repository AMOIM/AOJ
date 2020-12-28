import { Router } from 'express';

import Problem from '../controller/problem.controller';

const router = Router();

router.post('/', Problem.get);
router.get('/list', Problem.getAll);
router.post('/submit', Problem.submit);
router.post('/create', Problem.create);
router.delete('/delete/:id', Problem.delete);
router.patch('/update/:id', Problem.update);
router.get('/testcase/:id', Problem.getTestcase);
router.post('/testcase/:id', Problem.createTestcase);
router.put('/testcase/:id', Problem.updateTestcase);
router.delete('/testcase/:id', Problem.deleteTestcase);

export default router;