import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../interfaces/userInterface';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getUser(user: User): Promise<User[]> {
    const { username, password } = user;
    const [findUser] = await this.connection.execute(
      'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?',
      [username, password],
    );
    return findUser as User[];
  }

  public async getAllProducts(user: User): Promise<User[]> {
    const { username } = user;
    const [findUser] = await this.connection.execute(
      'SELECT * FROM Trybesmith.Users ',
      [username],
    );
    return findUser as User[];
  }

  public async create(user: User): Promise<User> {
    const { username, classe, level, password } = user;
    const [{ insertId }] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );
    return { id: insertId, username, classe, level, password };
  }
}