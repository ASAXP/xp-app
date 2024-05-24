import { db } from '../../index';
import { Progress } from '@xp-app/types';
import { QueryResult } from 'mysql2';

export default class progressService {
  private static TABLE_NAME = 'progress';
  private static SQL_SELECT =
    'SELECT ' +
    '   id, ' +
    '   name ' +
    'FROM ' + progressService.TABLE_NAME

  static async findAll(): Promise<Progress[]> {
    const query =
      progressService.SQL_SELECT +
      ' LIMIT 10'

    const [results, fields] = await db.promise().query(query);
    return this.resultsToProgress(results);
  }

  static async findById(id: bigint): Promise<Progress> {
    const query = progressService.SQL_SELECT +
      ' WHERE id = ?';
    const [results, fields] = await db.promise().query(query, [id]);
    return this.resultsToProgress(results)[0];
  }

  static async save(progress: Partial<Progress>) {
    const _fields = Object.keys(progress);
    if (_fields.length === 0) {
      throw new Error('No fields to update');
    }

    const values = _fields.map(field => progress[field]);
    const query = `INSERT INTO ${this.TABLE_NAME} (${_fields.join(', ')}) VALUES (${_fields.map(() => '?').join(', ')});`;
    const [results] = await db.promise().query(query, values);
    return results;
  }

  static async update(id: bigint, progress: Partial<Progress>) {
    const _fields = Object.keys(progress);
    if (_fields.length === 0) {
      throw new Error('No fields to update');
    }

    const setClause = _fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE ${this.TABLE_NAME} SET ${setClause} WHERE id = ?`;
    const values = [..._fields.map(field => (progress as any)[field]), id];

    const [results] = await db.promise().query(query, values);
    return results;
  }

  static async delete(id: bigint) {
    const query = `DELETE FROM ${progressService.TABLE_NAME} WHERE id = ?`;
    const [results] = await db.promise().query(query, [id]);
    return results;
  }

  private static resultsToProgress(results: QueryResult): Progress[] {
    return (results as any[]).map(row => ({
      id: row.id,
      name: row.name
    }));
  }
}
