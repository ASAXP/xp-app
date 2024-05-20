import express from 'express';
import { storyController } from '../../controllers/v1/storyController';

const router = express.Router();

router.get('/', storyController.get);

export { router as storyRoutes };
