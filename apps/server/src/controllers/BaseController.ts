import { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../error';
export class BaseController {
  constructor() {
    this.put = this.put.bind(this);
    this.post = this.post.bind(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  getAll(req: Request, res: Response, next: NextFunction) { res.status(404).send('The requested page could not be found.') }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  get(req: Request, res: Response, next: NextFunction) { res.status(404).send('The requested page could not be found.') }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  post(req: Request, res: Response, next: NextFunction) { res.status(404).send('The requested page could not be found.') }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  put(req: Request, res: Response, next: NextFunction) { res.status(404).send('The requested page could not be found.') }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  delete(req: Request, res: Response, next: NextFunction) { res.status(404).send('The requested page could not be found.') }

  protected send(res: Response, data: any, message?: string) {
    res.json({
      "success": true,
      "message": message,
      "data": typeof data === 'undefined' ? null : data,
    });
  }
}
