import { db } from '../../index';
import { Story } from '@xp-app/types';

export default class storyService {

  static async findAll(): Promise<Story[]> {

    const query =
      'SELECT ' +
      '   id, ' +
      '   parent_id, ' +
      '   type, ' +
      '   description, ' +
      '   content, ' +
      '   assignee_id, ' +
      '   point, ' +
      '   created_at, ' +
      '   updated_at ' +
      'FROM stories ' +
      'LIMIT 10'

    try {
      const [results, fields] = await db.promise().query(query);
      const rows = results as any[];
      return rows.map(row => ({
        id: row.id,
        type: row.type,
        description: row.description,
        content: row.content,
        point: row.point,
        assignee: '',
        parentStory: null,
        childStories: [],
      }));
    } catch (error) {
      return error.sqlMessage;
    }
  }
}
