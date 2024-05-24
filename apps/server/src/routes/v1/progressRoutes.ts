import express from 'express';
import { progressController } from '../../controllers/v1/progressController';
import { validateId } from '../../middlewares/ValidateId';

const router = express.Router();

router.put('/:id', validateId, progressController.put);
router.delete('/:id', validateId, progressController.delete);
router.get('/:id', validateId, progressController.get);
router.get('/', progressController.getAll);
router.post('/', progressController.post);

export { router as progressRoutes };
