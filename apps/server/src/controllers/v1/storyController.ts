import { Request, Response, NextFunction } from 'express';
import storyService from '@xp-app/services/storyService';
import { BaseController } from '../BaseController';

class StoryController extends BaseController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const stories = await storyService.findAll();
      super.send(res, stories, '');
    } catch (error) {
      next(error);
    }
  }
}

export const storyController = new StoryController();
