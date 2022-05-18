import { Pool, ResultSetHeader } from 'mysql2/promise';
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

  public async create(id: number) {
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [id],
    );
    return insertId;
  }
}