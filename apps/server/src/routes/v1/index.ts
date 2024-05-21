import express from 'express';
import { authRoutes } from './authRoutes';
import { storyRoutes } from './storyRoutes';
import { sprintRoutes } from './sprintRoutes';
import { progressRoutes } from './progressRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/story', storyRoutes);
router.use('/sprint', sprintRoutes);
router.use('/progress', progressRoutes);

export { router as v1Routes };
