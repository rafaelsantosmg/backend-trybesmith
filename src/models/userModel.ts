import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../interfaces/userInterface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  // public async getAll(): Promise<User[]> {
  //   const [users] = await this.connection.execute(`
  //   SELECT * FROM Trybesmith.Users`);
  //   return users as User[];
  // }

  public async create(user: User): Promise<User> {
    const { username, classe, level, password } = user;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    return { id: insertId, username, classe, level, password };
  }
}