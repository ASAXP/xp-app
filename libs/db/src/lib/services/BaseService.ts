import { db } from '../../index';

export class BaseService {
  protected static TABLE_NAME = '';
  protected static SQL_SELECT = '';

  static async save<Type>(type: Type) {
    const _fields = Object.keys(type);
    if (_fields.length === 0) {
      throw new Error('No fields to update');
    }

    const values = _fields.map(field => type[field]);
    const query = `INSERT INTO ${this.TABLE_NAME} (${_fields.join(', ')}) VALUES (${_fields.map(() => '?').join(', ')});`;
    const [results] = await db.promise().query(query, values);
    return results;
  }

  static async update<Type>(id: bigint, type: Type) {
    const _fields = Object.keys(type);
    if (_fields.length === 0) {
      throw new Error('No fields to update');
    }

    const setClause = _fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE ${this.TABLE_NAME} SET ${setClause} WHERE id = ?`;
    const values = [..._fields.map(field => (type as any)[field]), id];
    const [results] = await db.promise().query(query, values);
    return results;
  }

  static async delete(id: bigint) {
    const query = `DELETE FROM ${this.TABLE_NAME} WHERE id = ?`;
    const [results] = await db.promise().query(query, [id]);
    return results;
  }
}
