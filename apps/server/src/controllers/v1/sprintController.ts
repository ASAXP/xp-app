import { Request, Response, NextFunction } from 'express';
import sprintService from '@xp-app/services/sprintService';
import { BaseController } from '../BaseController';
import { Sprint } from '@xp-app/types';
import { CreateError, NotFoundError } from '../../error';
import { BadRequestError } from '../../error/BadRequestError';

class SprintController extends BaseController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const sprints = await sprintService.findAll();
      super.send(res, sprints);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const sprint = await sprintService.findById(BigInt(id));
      super.send(res, sprint);
    } catch (error) {
      next(error);
    }
  }

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const sprint: Partial<Sprint> = this.requestBodyToSprint(req.body);

      const save = await sprintService.save(sprint);
      if (!CreateError.testResult(save, 'Failed to create sprint')) {
        const data = await sprintService.findById(save['insertId']);
        super.send(res, data);
      }
    } catch (error) {
      next(error);
    }
  }

  async put(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const sprint: Partial<Sprint> = this.requestBodyToSprint(req.body);

      const update = await sprintService.update(BigInt(id), sprint);
      if (!NotFoundError.testResult(update, 'Sprint not found')) {
        const data = await sprintService.findById(BigInt(id));
        super.send(res, data);
      }

    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const data = await sprintService.findById(BigInt(id));
      const deleted = await sprintService.delete(BigInt(id));

      if (!NotFoundError.testResult(deleted, 'Sprint not found')) {
        super.send(res, data);
      }
    } catch (error) {
      next(error);
    }
  }

  // request body 에서 sprint 로 변환할 수 있는 필드만 추출합니다.
  private requestBodyToSprint = (body: Partial<Sprint>): Partial<Sprint> => {
    const sprint: Partial<Sprint> = {
      name: body.name,
      description: body.description,
      cycle: body.cycle,
      beginDate: body.beginDate,
      endDate: body.endDate,
    };

    if (body.name === undefined) delete sprint.name;
    if (body.description === undefined) delete sprint.description;
    if (body.cycle === undefined) delete sprint.cycle;
    if (body.beginDate === undefined) delete sprint.beginDate;
    if (body.endDate === undefined) delete sprint.endDate;

    if (Object.keys(sprint).length === 0) throw new BadRequestError('No fields to update');
    return sprint;
  }
}

export const sprintController = new SprintController();
