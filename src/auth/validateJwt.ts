import { Request, Response, NextFunction } from 'express';
import jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
import UserModel from '../models/userModel';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'NewSummerJobToTrybe17';

const userModel = new UserModel();

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await userModel.findOne({ 
      where: { email: decoded.data.email },
    });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};