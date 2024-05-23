import { QueryResult } from 'mysql2';

export class CreateError extends Error {
  private statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'CreateError';
    this.statusCode = 404;
  }

  static test(create: QueryResult, message: string) {
    if (create['affectedRows'] === 0) {
      throw new CreateError(message);
    }
    return false;
  }
}
