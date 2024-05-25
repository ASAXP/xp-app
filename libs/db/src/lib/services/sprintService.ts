import { db } from '../../index';
import { Sprint } from '@xp-app/types';
import { QueryResult } from 'mysql2';
import { BaseService } from './BaseService';

export default class sprintService extends BaseService{
  static TABLE_NAME = 'sprints';
  static SQL_SELECT =
    'SELECT ' +
    '   id, ' +
    '   name, ' +
    '   description, ' +
    '   cycle, ' +
    '   begin_date, ' +
    '   end_date, ' +
    '   updated_at, ' +
    '   created_at ' +
    'FROM ' + this.TABLE_NAME;

  static async findAll(): Promise<Sprint[]> {
    const query =
      this.SQL_SELECT +
      ' LIMIT 10'

    const [results, fields] = await db.promise().query(query);
    return this.resultsToSprint(results);
  }

  static async findById(id: bigint): Promise<Sprint> {
    const query = this.SQL_SELECT +
      ' WHERE id = ?';
    const [results, fields] = await db.promise().query(query, [id]);
    return this.resultsToSprint(results)[0];
  }

  static async save(sprint: Partial<Sprint>) { return super.save<Partial<Sprint>>(sprint); }
  static async update(id: bigint, sprint: Partial<Sprint>) { return super.update<Partial<Sprint>>(id, sprint); }
  static async delete(id: bigint) { return super.delete(id); }

  private static resultsToSprint(results: QueryResult): Sprint[] {
    return (results as any[]).map(row => ({
      id: row.id,
      name: row.name,
      description: row.description,
      cycle: row.cycle,
      beginDate: row.begin_date,
      endDate: row.end_date,
      updatedAt: row.updated_at,
      createdAt: row.created_at
    }));
  }
}
