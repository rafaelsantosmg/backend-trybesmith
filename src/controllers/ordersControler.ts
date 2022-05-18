import { Request, Response } from 'express';
import OrdersService from '../services/ordersService';

export default class OrdersController {
  constructor(private ordersService = new OrdersService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.ordersService.getAll();
    return res.status(200).json(orders);
  };

  public create = async (req: Request, res: Response) => {
    const order = await this.ordersService.create(req.body);
    return res.status(201).json(order);
  };
}