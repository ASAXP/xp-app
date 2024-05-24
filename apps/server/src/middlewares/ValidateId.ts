import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../error/BadRequestError';

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    next(new BadRequestError('Invalid ID'));
  } else {
    next();
  }
};
