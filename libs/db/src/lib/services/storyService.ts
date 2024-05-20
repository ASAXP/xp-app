import { db } from '../../index';

export default class storyService {

  static async findAll() {
    const query =
      'SELECT ' +
      'id, parent_id, type, description, assignee_id, point, meta, created_at, updated_at ' +
      'FROM stories LIMIT 10'
    const [results, fields] = await db.promise().query(query);
    return results;
  }
}
