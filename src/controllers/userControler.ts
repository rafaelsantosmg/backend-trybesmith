import { Request, Response } from 'express';
import UserService from '../services/userService';
import { createToken } from '../utils/token';

export default class UserController {
  constructor(private userService = new UserService()) { }

  public getUser = async (req: Request, res: Response) => {
    const user = await this.userService.getUser(req.body);
    if (user === false) return res.status(401).json({ message: 'Username or password invalid' });
    const token = createToken(user);
    return res.status(200).json({ token });
  };

  public create = async (req: Request, res: Response) => {
    const user = await this.userService.create(req.body);
    const token = createToken(user);
    return res.status(201).json({ token });
  };
}