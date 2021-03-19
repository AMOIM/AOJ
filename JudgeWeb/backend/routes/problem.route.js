import { Router } from 'express';
import Problem from '../controller/problem.controller';
import { authMiddlewareBackend } from '../middlewares/auth';

const router = Router();

router.post('/', Problem.get);
router.get('/list', Problem.getAll);
router.post('/submit', authMiddlewareBackend(), Problem.submit);
router.post('/create', authMiddlewareBackend('admin'), Problem.create);
router.delete('/delete/:id', authMiddlewareBackend('admin'), Problem.delete);
router.patch('/update/:id', authMiddlewareBackend('admin'), Problem.update);
router.get('/testcase/:id', authMiddlewareBackend(), Problem.getTestcase);
router.get('/testcase/example/:id', authMiddlewareBackend(), Problem.getTestcaseExample);
router.put('/testcase/:id', authMiddlewareBackend('admin'), Problem.updateTestcase);
router.delete('/testcase/:id', authMiddlewareBackend('admin'), Problem.deleteTestcase);

export default router;