import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

export default (schemas: Schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schemas.validate(req.body);
  if (error === undefined) return next();
  if (error && error.details[0].type === 'any.required') {
    return res.status(400).json({ message: error.details[0].message });
  }
  return res.status(422).json({ message: error.details[0].message });
};