import express from 'express';
import { storyController } from '../../controllers/v1/storyController';
import { validateId } from '../../middlewares/ValidateId';

const router = express.Router();

router.put('/:id', validateId, storyController.put);
router.delete('/:id', validateId, storyController.delete);
router.get('/:id', validateId, storyController.get);
router.get('/', storyController.getAll);
router.post('/', storyController.post);

export { router as storyRoutes };
