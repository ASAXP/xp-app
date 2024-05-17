import express from 'express';
import { authController } from '../../controllers/v1/authController';

const router = express.Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);

export { router as authRoutes };
