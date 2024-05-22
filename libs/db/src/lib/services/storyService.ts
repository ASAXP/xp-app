import { db } from '../../index';
import { Story } from '@xp-app/types';

export default class storyService {

  static async findAll() {

    const query =
      'SELECT ' +
      '   id, ' +
      '   parent_id, ' +
      '   type, ' +
      '   description, ' +
      '   content, ' +
      '   assignee_id, ' +
      '   point, ' +
      '   meta, ' +
      '   created_at, ' +
      '   updated_at ' +
      'FROM stories ' +
      'LIMIT 10'

    try {
      const [results, fields] = await db.promise().query(query);
      const rows = results as any[];
      const stories = [] as Story[];

      for (const row of rows) {
        stories.push({
          id: row.id,
          type: row.type,
          description: row.description,
          content: row.content,
          point: row.point,
          assignee: '',
          parentStory: null,
          childStories: [],
        })
      }

      return stories;
    } catch (error) {
      return error.sqlMessage;
    }
  }
}
