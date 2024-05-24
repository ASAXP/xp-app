import { Request, Response, NextFunction } from 'express';
import storyService from '@xp-app/services/storyService';
import { BaseController } from '../BaseController';
import { Story } from '@xp-app/types';
import { BadRequestError } from '../../error/BadRequestError';

class StoryController extends BaseController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const stories = await storyService.findAll();
      super.send(res, stories, '');
    } catch (error) {
      next(error);
    }
  }

  // request body 에서 progress 로 변환할 수 있는 필드만 추출합니다.
  private requestBodyToStory = (body: Partial<Story>): Partial<Story> => {
    const progress: Partial<Story> = {
      type: body.type,
      description: body.description,
      content: body.content,
      point: body.point,
      assignee: body.assignee,
      parentStory: body.parentStory,
      childStories: body.childStories,
    };

    if (body.type === undefined) delete progress.type;
    if (body.description === undefined) delete progress.description;
    if (body.content === undefined) delete progress.content;
    if (body.point === undefined) delete progress.point;
    if (body.assignee === undefined) delete progress.assignee;
    if (body.parentStory === undefined) delete progress.parentStory;
    if (body.childStories === undefined) delete progress.childStories;

    if (Object.keys(progress).length === 0) throw new BadRequestError('No fields to update');
    return progress;
  }
}

export const storyController = new StoryController();
