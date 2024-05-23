import { Request, Response, NextFunction } from 'express';
import sprintService from '@xp-app/services/sprintService';
import storyService from '@xp-app/services/storyService';
import { BaseController } from '../BaseController';

class SprintController extends BaseController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const sprints = await sprintService.findAll();
      super.send(res, sprints, '');
    } catch (error) {
      next(error);
    }
  }
}

export const sprintController = new SprintController();
