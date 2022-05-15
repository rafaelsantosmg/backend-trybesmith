import { Request, Response } from 'express';
import UserService from '../services/userService';
import { createToken } from '../utils/token';

export default class UserController {
  constructor(private userService = new UserService()) { }

  // public getAll = async (_req: Request, res: Response) => {
  //   const products = await this.productService.getAll();
  //   return res.status(200).json(products);
  // };

  public create = async (req: Request, res: Response) => {
    const user = await this.userService.create(req.body);
    const token = createToken(user);
    return res.status(201).json({ token });
  };
}