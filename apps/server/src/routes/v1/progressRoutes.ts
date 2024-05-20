import express from 'express';
import { progressController } from '../../controllers/v1/progressController';

const router = express.Router();

router.get('/', progressController.get);
router.post('/', progressController.post);
router.put('/:id', progressController.put);
router.delete('/:id', progressController.delete);

export { router as progressRoutes };
