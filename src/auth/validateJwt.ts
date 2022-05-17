import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
import connection from '../models/connection';
import UserModel from '../models/userModel';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'NewSummerJobToTrybe17';

const userModel = new UserModel(connection);

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    const user = await userModel.getUser(req.body);
    req.body.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};