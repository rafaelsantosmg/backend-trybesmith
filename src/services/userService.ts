import connection from '../models/connection';
import UserModel from '../models/userModel';
import User from '../interfaces/userInterface';

export default class ProductService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  // public async getAll(): Promise<User[]> {
  //   const users = await this.model.getAll();
  //   return users;
  // }

  public async create(user: User): Promise<User> {
    const result = await this.model.create(user);
    return result;
  }
}