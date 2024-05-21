import express from 'express';
import { sprintController } from '../../controllers/v1/sprintController';

const router = express.Router();

router.get('/', sprintController.get);

export { router as sprintRoutes };
