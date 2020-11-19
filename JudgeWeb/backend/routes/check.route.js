import express from 'express';
const router =  express.Router();
import authMiddleware from '../middlewares/auth.js';

router.get('/', authMiddleware);

module.exports = router;