import { db } from '../../index';
import { Story } from '@xp-app/types';
import { QueryResult } from 'mysql2';
import { BaseService } from './BaseService';

export default class storyProgressSprint extends BaseService{
  static TABLE_NAME = 'story_progress_sprint';
  static SQL_SELECT =
    'SELECT ' +
    '   sps.id, ' +
    '   sps.story_id, ' +
    '   sps.sprint_id, ' +
    '   sps.progress_id, ' +
    '   sps.created_at, ' +
    '   sps.updated_at, ' +

    '   s.`type` AS story_type, ' +
    '   s.`description` AS story_description, ' +
    '   s.`point` AS story_point, ' +
    '   s.content AS story_content, ' +
    '   u.`name` AS story_assignee, ' +

    '   p.`name` AS progress_name ' +
    'FROM ' + this.TABLE_NAME + ' AS sps ' +
    'LEFT JOIN stories AS s ON s.id = sps.story_id ' +
    'LEFT JOIN users AS u ON s.assignee_id = u.id ' +
    'LEFT JOIN progress AS p ON p.id = sps.progress_id ';

  static async findByStoryId(storyId: bigint) {
    const query = this.SQL_SELECT +
      ' WHERE sps.story_id = ?';

    const [results, fields] = await db.promise().query(query, [storyId]);
    return results;
  }

  static async saveSPS(storyId: bigint, progressId?: bigint, sprintId?: bigint) {
    const values = [storyId, progressId, sprintId]
    const query = `INSERT INTO ${this.TABLE_NAME} (story_id, progress_id, sprint_id) VALUES (?, ?, ?)`;
    const [results] = await db.promise().query(query, values);
    return results;
  }

  static async updateProgress(storyId: bigint, progressId: bigint) {
    const values = [progressId, storyId]
    const query = `UPDATE ${this.TABLE_NAME} SET progress_id = ? WHERE story_id = ?`;
    const [results] = await db.promise().query(query, values);
    return results;
  }

  static async updateSprint(storyId: bigint, sprintId: bigint) {
    const values = [sprintId, storyId]
    const query = `UPDATE ${this.TABLE_NAME} SET sprint_id = ? WHERE story_id = ?`;
    const [results] = await db.promise().query(query, values);
    return results;
  }
}
