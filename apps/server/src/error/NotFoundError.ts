import { QueryResult } from 'mysql2';

export class NotFoundError extends Error {
  private statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }

  static test(update: QueryResult, message: string) {
    if (update['affectedRows'] === 0) {
      throw new NotFoundError(message);
    }
    return false;
  }
}
