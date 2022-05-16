import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/productInterface';
import Orders from '../interfaces/ordersInterface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Product[]> {
    const [products] = await this.connection.execute(`
    SELECT * FROM Trybesmith.Products`);
    return products as Product[];
  }

  public async getAllProductsIds(id: number): Promise<Orders[]> {
    const [productsIds] = await this.connection.execute(
      `SELECT p.id FROM Trybesmith.Products as p
      INNER JOIN Trybesmith.Orders as o
      ON p.orderId = o.id
      WHERE o.id = ?`,
      [id],
    );
    return productsIds as Orders[];
  }

  public async create(product: Product): Promise<Product> {
    const { name, amount } = product;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    return { id: insertId, name, amount };
  }
}