import { db } from '../../index';
import { Sprint } from '@xp-app/types';

export default class sprintService {

  static async findAll() {
    const query =
      'SELECT ' +
      '   sp.id AS id, ' +
      '   p.id AS progress_id, ' +
      '   p.title AS progress_title, ' +
      '   s.id AS story_id, ' +
      '   s.`type` AS story_type, ' +
      '   s.`description` AS story_title ' +
      'FROM sprints AS sp ' +
      'LEFT JOIN progress AS p ' +
      '   ON sp.progress_id = p.id ' +
      'LEFT JOIN stories AS s ' +
      '   ON sp.story_id = s.id ' +
      'LIMIT 10'
    const [results, fields] = await db.promise().query(query);
    const rows = results as any[];
    const sprints = [] as Sprint[];
    for (const row of rows) {
      sprints.push({
        id: row.id,
        progress: {
          id: row.progress_id,
          title: row.progress_title
        },
        story: {
          id: row.story_id,
          type: row.story_type,
          description: row.story_title,
          point: 0,
          assignee: null,
          related: [],
        }
      });
    }
    return sprints;
  }
}
