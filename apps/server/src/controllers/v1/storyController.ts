import { Request, Response, NextFunction } from 'express';
import storyService from '@xp-app/services/storyService';
import { BaseController } from '../BaseController';
import { Story } from '@xp-app/types';
import { BadRequestError } from '../../error/BadRequestError';

class StoryController extends BaseController {

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const stories = await storyService.findAll();
      super.send(res, stories);
    } catch (error) {
      next(error);
    }
  }

  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const story = await storyService.findById(BigInt(id));
      super.send(res, story);
    } catch (error) {
      next(error);
    }
  }

  // request body 에서 story 로 변환할 수 있는 필드만 추출합니다.
  private requestBodyToStory = (body: Partial<Story>): Partial<Story> => {
    const story: Partial<Story> = {
      type: body.type,
      description: body.description,
      content: body.content,
      point: body.point,
      assignee: body.assignee,
      parentStory: body.parentStory,
      childStories: body.childStories,
    };

    if (body.type === undefined) delete story.type;
    if (body.description === undefined) delete story.description;
    if (body.content === undefined) delete story.content;
    if (body.point === undefined) delete story.point;
    if (body.assignee === undefined) delete story.assignee;
    if (body.parentStory === undefined) delete story.parentStory;
    if (body.childStories === undefined) delete story.childStories;

    if (Object.keys(story).length === 0) throw new BadRequestError('No fields to update');
    return story;
  }
}

export const storyController = new StoryController();
