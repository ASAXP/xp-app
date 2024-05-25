import express from 'express';
import { sprintController } from '../../controllers/v1/sprintController';
import { validateId } from '../../middlewares/ValidateId';

const router = express.Router();

router.put('/:id', validateId, sprintController.put);
router.delete('/:id', validateId, sprintController.delete);
router.get('/:id', validateId, sprintController.get);
router.get('/', sprintController.getAll);
router.post('/', sprintController.post);

export { router as sprintRoutes };
