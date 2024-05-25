import { db } from '../../index';
import { Story } from '@xp-app/types';
import { QueryResult } from 'mysql2';
import { BaseService } from './BaseService';

export default class storyService extends BaseService{
  static TABLE_NAME = 'stories';
  static SQL_SELECT =
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
    'FROM ' + this.TABLE_NAME;

  static async findAll(): Promise<Story[]> {
    const query =
      this.SQL_SELECT +
      ' LIMIT 10'

    const [results, fields] = await db.promise().query(query);
    return this.resultsToStory(results);
  }

  static async findById(id: bigint): Promise<Story> {
    const query = this.SQL_SELECT +
      ' WHERE id = ?';

    const [results, fields] = await db.promise().query(query, [id]);
    return this.resultsToStory(results)[0];
  }



  static async save(sprint: Partial<Story>) { return super.save<Partial<Story>>(sprint); }
  static async update(id: bigint, sprint: Partial<Story>) { return super.update<Partial<Story>>(id, sprint); }
  static async delete(id: bigint) { return super.delete(id); }

  private static resultsToStory(results: QueryResult): Story[] {
    return (results as any[]).map(row => ({
      id: row.id,
      type: row.type,
      description: row.description,
      content: row.content,
      point: row.point,
      assignee: '',
      parentStory: null,
      childStories: [],
    }));
  }
}
