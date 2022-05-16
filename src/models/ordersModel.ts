import { Pool } from 'mysql2/promise';
import Orders from '../interfaces/ordersInterface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Orders[]> {
    const [orders] = await this.connection.execute(
      'SELECT * FROM Trybesmith.Orders',
    );
    return orders as Orders[];
  }
}