import { db } from '../../index';
import { Progress } from '@xp-app/types';

export default class progressService {
  private static TABLE_NAME = 'progress';

  static async findAll(): Promise<Progress[]> {
    const query =
      'SELECT ' +
      '   id, name' +
      ' FROM ' + progressService.TABLE_NAME +
      ' LIMIT 10'

    try {
      const [results, fields] = await db.promise().query(query);
      const rows = results as any[];
      const progress: Progress[] = [];
      for (const row of rows) {
        progress.push({
          id: row.id,
          name: row.name
        });
      }
      return progress;
    } catch (error) {
      return error.sqlMessage;
    }
  }

  static async save(title: string) {
    const query =
      'INSERT INTO ' + progressService.TABLE_NAME +
      ' (title) ' +
      'VALUES (?)';

    try {
      const [results, fields] = await db.promise().query(query, [title]);
      return results;
    } catch (error) {
      return error.sqlMessage;
    }
  }

  static async update(id: bigint, name: string) {
    const query =
      'UPDATE ' + progressService.TABLE_NAME +
      ' SET name = ? ' +
      'WHERE id = ?';

    try {
      const [results, fields] = await db.promise().query(query, [name, id]);
      return results;
    } catch (error) {
      return error.sqlMessage;
    }
  }

  static async delete(id: bigint) {
    const query =
      'DELETE FROM ' + progressService.TABLE_NAME +
      ' WHERE id = ?';

    try {
      const [results, fields] = await db.promise().query(query, [id]);
      return results;
    } catch (error) {
      return error.sqlMessage;
    }
  }
}
