import connection from '../models/connection';
import OrderModel from '../models/ordersModel';
import ProductModel from '../models/productModel';
import Orders from '../interfaces/ordersInterface';

export default class OrdersService {
  public orderModel: OrderModel;

  public productModel: ProductModel;

  constructor() {
    this.orderModel = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
  }

  public async getAll(): Promise<Orders[]> {
    const allOrders = await this.orderModel.getAll();
    const orders: Array<object> = [];
    await Promise.all(allOrders.map(async (order) => {
      const productsIds: Array<number> = [];
      const products = await this.productModel.getAllProductsIds(order.id);
      products.forEach((product) => productsIds.push(product.id));
      return orders.push({ ...order, productsIds });
    }));
    return orders as Orders[];
  }
}