import { db } from '../../index';
import { Sprint } from '@xp-app/types';

export default class sprintService {

  static async findAll(): Promise<Sprint[]> {
    const query =
      'SELECT ' +
      '   id, ' +
      '   name, ' +
      '   description, ' +
      '   cycle, ' +
      '   begin_date, ' +
      '   end_date, ' +
      '   updated_at, ' +
      '   created_at ' +
      'FROM sprints ' +
      'LIMIT 10'

    const [results, fields] = await db.promise().query(query);
    const rows = results as any[];
    return rows.map(row => ({
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
