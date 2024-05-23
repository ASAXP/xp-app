import { Request, Response, NextFunction } from 'express';
import progressService from '@xp-app/services/progressService';
import { CreateError, NotFoundError } from '../../error';
import { BaseController } from '../BaseController';

class ProgressController extends BaseController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const progress = await progressService.findAll();
      super.send(res, progress, '');
    } catch (error) {
      next(error);
    }
  }

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const save = await progressService.save(name);
      if (!CreateError.test(save, 'Failed to create progress')) {
        const data = await progressService.findById(save['insertId']);
        super.send(res, data, 'Created progress successfully!');
      }
    } catch (error) {
      next(error);
    }
  }

  async put(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const update = await progressService.update(BigInt(id), name);

      if (!NotFoundError.test(update, 'Progress not found')) {
        const data = await progressService.findById(BigInt(id));
        super.send(res, data, 'Updated progress successfully!');
      }
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const data = await progressService.findById(BigInt(id));
      const deleted = await progressService.delete(BigInt(id));

      if (!NotFoundError.test(deleted, 'Progress not found')) {
        super.send(res, data, 'Deleted progress successfully!');
      }
    } catch (error) {
      next(error);
    }
  }
}

export const progressController = new ProgressController();
