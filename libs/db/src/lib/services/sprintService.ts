import { db } from '../../index';
import { Sprint } from '@xp-app/types';

export default class sprintService {

  static async findAll() {
    const query =
      'SELECT ' +
      '   sp.id AS id, ' +
      '   p.id AS progress_id, ' +
      '   p.name AS progress_name, ' +
      '   s.id AS story_id, ' +
      '   s.`type` AS story_type, ' +
      '   s.`description` AS story_description, ' +
      '   s.content AS story_content ' +
      'FROM sprints AS sp ' +
      'LEFT JOIN progress AS p ' +
      '   ON sp.progress_id = p.id ' +
      'LEFT JOIN stories AS s ' +
      '   ON sp.story_id = s.id ' +
      'LIMIT 10'

    try {
      const [results, fields] = await db.promise().query(query);
      return results;
    } catch (error) {
      return error.sqlMessage;
    }
  }
}
