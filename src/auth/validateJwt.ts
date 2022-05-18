import { Request, Response, NextFunction } from 'express';
import connection from '../models/connection';
import UserModel from '../models/userModel';
import { decoderToken } from '../utils/token';

const userModel = new UserModel(connection);

interface User {
  user: [{
    id?: number;
    username: string;
    classe?: string;
    level?: number;
    password: string; 
  }]
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const data = decoderToken(token);
  if (!data) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  const user = (data as User).user[0];
  const finduser = await userModel.getUser(user);
  if (finduser.length === 0) {
    return res.status(404).json({ message: 'User not found' });
  }
  req.body.user = user;
  next();
};