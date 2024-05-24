import { Request, Response, NextFunction } from 'express';
import progressService from '@xp-app/services/progressService';
import { CreateError, NotFoundError } from '../../error';
import { BaseController } from '../BaseController';
import { Progress } from '@xp-app/types';
import { BadRequestError } from '../../error/BadRequestError';

class ProgressController extends BaseController {

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const progress = await progressService.findAll();
      super.send(res, progress);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const progress = await progressService.findById(BigInt(id));
      super.send(res, progress);
    } catch (error) {
      next(error);
    }
  }

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const progress: Partial<Progress> = this.requestBodyToProgress(req.body);

      const save = await progressService.save(progress);
      if (!CreateError.testResult(save, 'Failed to create progress')) {
        const data = await progressService.findById(save['insertId']);
        super.send(res, data);
      }
    } catch (error) {
      next(error);
    }
  }

  async put(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const progress: Partial<Progress> = this.requestBodyToProgress(req.body);

      const update = await progressService.update(BigInt(id), progress);
      if (!NotFoundError.testResult(update, 'Progress not found')) {
        const data = await progressService.findById(BigInt(id));
        super.send(res, data);
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

      if (!NotFoundError.testResult(deleted, 'Progress not found')) {
        super.send(res, data);
      }
    } catch (error) {
      next(error);
    }
  }

  // request body 에서 progress 로 변환할 수 있는 필드만 추출합니다.
  private requestBodyToProgress = (body: Partial<Progress>): Partial<Progress> => {
    const progress: Partial<Progress> = {
      name: body.name
    };

    if (body.name === undefined) delete progress.name;

    if (Object.keys(progress).length === 0) throw new BadRequestError('No fields to update');
    return progress;
  }
}

export const progressController = new ProgressController();
