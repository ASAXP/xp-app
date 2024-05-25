import { Request, Response, NextFunction } from 'express';
import storyService from '@xp-app/services/storyService';
import { BaseController } from '../BaseController';
import { Story } from '@xp-app/types';
import { BadRequestError } from '../../error/BadRequestError';
import { CreateError, NotFoundError } from '../../error';
import storyProgressSprint from '@xp-app/services/storyProgressSprint';
import progressService from '@xp-app/services/progressService';
import sprintService from '@xp-app/services/sprintService';

class StoryController extends BaseController {

  async moveProgress(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { progressId } = req.body;

      if (!/^\d+$/.test(progressId)) {
        throw new BadRequestError('Invalid progressId');
      }

      // 존재하는 story 인지 확인
      const story = await storyService.findById(BigInt(id));
      if (!story) {
        throw new NotFoundError('Story not found');
      }

      // 존재하는 progress 인지 확인
      const progress = await progressService.findById(BigInt(progressId));
      if (!progress) {
        throw new NotFoundError('Progress not found');
      }

      let sps = await storyProgressSprint.findByStoryId(BigInt(id));
      const rows = sps as any[];

      // 스프린트에 올라간 스토리가 없는 경우
      if (rows.length === 0) {
        await storyProgressSprint.saveSPS(BigInt(id), BigInt(progressId), null);
        sps = await storyProgressSprint.findByStoryId(BigInt(id));
      }

      // 스프린트에 올라간 스토리가 있는 경우
      else {
        await storyProgressSprint.updateProgress(BigInt(id), BigInt(progressId));
        sps = await storyProgressSprint.findByStoryId(BigInt(id));
      }
      super.send(res, sps);

    } catch (error) {
      next(error);
    }
  }
  async moveSprint(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { sprintId } = req.body;

      if (!/^\d+$/.test(sprintId)) {
        throw new BadRequestError('Invalid progressId');
      }

      // 존재하는 story 인지 확인
      const story = await storyService.findById(BigInt(id));
      if (!story) {
        throw new NotFoundError('Story not found');
      }

      // 존재하는 sprint 인지 확인
      const sprint = await sprintService.findById(BigInt(sprintId));
      if (!sprint) {
        throw new NotFoundError('Sprint not found');
      }

      let sps = await storyProgressSprint.findByStoryId(BigInt(id));
      const rows = sps as any[];

      // 스프린트에 올라간 스토리가 없는 경우
      if (rows.length === 0) {
        await storyProgressSprint.saveSPS(BigInt(id), null, BigInt(sprintId));
        sps = await storyProgressSprint.findByStoryId(BigInt(id));
      }

      // 스프린트에 올라간 스토리가 있는 경우
      else {
        await storyProgressSprint.updateSprint(BigInt(id), BigInt(sprintId));
        sps = await storyProgressSprint.findByStoryId(BigInt(id));
      }
      super.send(res, sps);

    } catch (error) {
      next(error);
    }
  }

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

  async post(req: Request, res: Response, next: NextFunction) {
    try {
      const story: Partial<Story> = this.requestBodyToStory(req.body);

      const save = await storyService.save(story);
      if (!CreateError.testResult(save, 'Failed to create story')) {
        const data = await storyService.findById(save['insertId']);
        super.send(res, data);
      }
    } catch (error) {
      next(error);
    }
  }



  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const data = await storyService.findById(BigInt(id));
      const deleted = await storyService.delete(BigInt(id));

      if (!NotFoundError.testResult(deleted, 'Story not found')) {
        super.send(res, data);
      }
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
