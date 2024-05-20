import { Request, Response } from 'express';
import storyService from '@xp-app/services/storyService';

class StoryController {
  async get(req: Request, res: Response) {
    const stories = await storyService.findAll();
    res.send(stories);
  }
}

export const storyController = new StoryController();
