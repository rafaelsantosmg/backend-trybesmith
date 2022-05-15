import connection from '../models/connection';
import ProductModel from '../models/productModel';
import Product from '../interfaces/productInterface';

export default class ProductService {
  public model: ProductModel;

  constructor() {
    this.model = new ProductModel(connection);
  }

  public async getAll(): Promise<Product[]> {
    const products = await this.model.getAll();
    return products;
  }

  public async create(product: Product): Promise<Product> {
    const result = await this.model.create(product);
    return result;
  }
}