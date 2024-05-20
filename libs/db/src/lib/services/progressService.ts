import { db } from '../../index';

export default class progressService {
  private static TABLE_NAME = 'progress';

  static async findAll() {
    const query =
      'SELECT ' +
      '   id, title' +
      ' FROM ' + progressService.TABLE_NAME +
      ' LIMIT 10'
    const [results, fields] = await db.promise().query(query);
    return results;
  }

  static async save(title: string) {
    const query =
      'INSERT INTO ' + progressService.TABLE_NAME +
      ' (title) ' +
      'VALUES (?)';
    const [results, fields] = await db.promise().query(query, [title]);
    return results;
  }

  static async update(id: bigint, title: string) {
    const query =
      'UPDATE ' + progressService.TABLE_NAME +
      ' SET title = ? ' +
      'WHERE id = ?';
    const [results, fields] = await db.promise().query(query, [title, id]);
    return results;
  }

  static async delete(id: bigint) {
    const query =
      'DELETE FROM ' + progressService.TABLE_NAME +
      ' WHERE id = ?';
    const [results, fields] = await db.promise().query(query, [id]);
    return results;
  }
}
