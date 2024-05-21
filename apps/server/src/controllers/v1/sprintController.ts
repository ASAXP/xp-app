import { Request, Response } from 'express';
import sprintService from '@xp-app/services/sprintService';

class SprintController {
  async get(req: Request, res: Response) {
    const sprints = await sprintService.findAll();
    res.send(sprints);
  }
}

export const sprintController = new SprintController();
