import { db } from '../../index';
import { Progress } from '@xp-app/types';
import { QueryResult } from 'mysql2';
import { BaseService } from './BaseService';

export default class progressService extends BaseService{
  static TABLE_NAME = 'progress';
  static SQL_SELECT =
    'SELECT ' +
    '   id, ' +
    '   name ' +
    'FROM ' + this.TABLE_NAME;

  static async findAll(): Promise<Progress[]> {
    const query =
      this.SQL_SELECT +
      ' LIMIT 10'

    const [results, fields] = await db.promise().query(query);
    return this.resultsToProgress(results);
  }

  static async findById(id: bigint): Promise<Progress> {
    const query = this.SQL_SELECT +
      ' WHERE id = ?';
    const [results, fields] = await db.promise().query(query, [id]);
    return this.resultsToProgress(results)[0];
  }

  static async save(sprint: Partial<Progress>) { return super.save<Partial<Progress>>(sprint); }
  static async update(id: bigint, sprint: Partial<Progress>) { return super.update<Partial<Progress>>(id, sprint); }
  static async delete(id: bigint) { return super.delete(id); }

  private static resultsToProgress(results: QueryResult): Progress[] {
    return (results as any[]).map(row => ({
      id: row.id,
      name: row.name
    }));
  }
}
