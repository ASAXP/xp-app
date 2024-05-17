import express from 'express';
import { authRoutes } from './authRoutes';
import { storyRoutes } from './storyRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/story', storyRoutes);

export { router as v1Routes };
