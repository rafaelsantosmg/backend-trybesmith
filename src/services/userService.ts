import connection from '../models/connection';
import UserModel from '../models/userModel';
import User from '../interfaces/userInterface';

export default class ProductService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async getUser(user: User): Promise<User[] | boolean> {
    const findUser = await this.model.getUser(user);
    if (findUser.length === 0) return false;
    return findUser;
  }

  public async create(user: User): Promise<User> {
    const result = await this.model.create(user);
    return result;
  }
}