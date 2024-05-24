import { QueryResult } from 'mysql2';

export class CreateError extends Error {
  private statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'CreateError';
    this.statusCode = 404;
  }

  static testResult(res: QueryResult, message: string) {
    if (res['affectedRows'] === 0) {
      throw new CreateError(message);
    }
    return false;
  }
}
