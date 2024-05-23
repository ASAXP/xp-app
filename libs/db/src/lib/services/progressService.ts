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
  }

  static async save(name: string) {
    const query =
      'INSERT INTO ' + progressService.TABLE_NAME +
      ' (name) ' +
      'VALUES (?)';

    const [results, fields] = await db.promise().query(query, [name]);
    return results;
  }

  static async update(id: bigint, name: string) {
    const query =
      'UPDATE ' + progressService.TABLE_NAME +
      ' SET name = ? ' +
      'WHERE id = ?';

    const [results, fields] = await db.promise().query(query, [name, id]);
    return results;
  }

  static async delete(id: bigint) {
    const query =
      'DELETE FROM ' + progressService.TABLE_NAME +
      ' WHERE id = ?';

    const [results, fields] = await db.promise().query(query, [id]);
    return results;
  }

  static async findById(id: bigint) {
    const query =
      'SELECT ' +
      '   id, name' +
      ' FROM ' + progressService.TABLE_NAME +
      ' WHERE id = ?';
    const [results, fields] = await db.promise().query(query, [id]);
    return results[0];
  }
}
