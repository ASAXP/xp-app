import { Request, Response } from 'express';
import { db } from '@xp-app/db';

class StoryController {
  async get(req: Request, res: Response) {
    const query =
      'SELECT id, parent_id, type, description, assignee_id, point, meta, created_at, updated_at ' +
      'FROM stories LIMIT 10'
      const [results, fields] = await db.promise().query(query);
    res.send(results);
  }

  async post(req: Request, res: Response) {
    const { title, content } = req.body;
    const query = 'INSERT INTO stories (title, content) VALUES (?, ?)';
    const [results, fields] = await db.promise().query(query, [title, content]);
    res.send(results);
  }
}

export const storyController = new StoryController();
