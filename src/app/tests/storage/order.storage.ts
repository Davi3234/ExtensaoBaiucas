import { Order } from '../../service/order/order';
import { getId } from '../utils';
import { MockStorage } from './mock.storage';

export class OrderMockStorage extends MockStorage {
  constructor() {
    super();
    if (!this.getItem("order")) {
      this.setItem("order", JSON.stringify([]));
    }
  }

  save(order: Order) {
    const orders = this.getOrders();
    order.id = this.getOrderNextId();
    orders.push(order);
    this.setOrders(orders);
  }

  remove(orderId: number) {
    const orders = this.getOrders().filter((u) => u.id !== orderId);
    this.setOrders(orders);
  }

  edit(order: Order) {
    const orders = this.getOrders().map((u) => (u.id == order.id ? order : u));
    this.setOrders(orders);
  }

  find(orderId: number): Order | undefined {
    return this.getOrders().find((u) => u.id == orderId);
  }

  getOrders(): Order[] {
    return JSON.parse(this.getItem("order") || "[]");
  }

  getOrderNextId(): number {
    return getId('orderId');
  }
  setOrderId(value: number): void {
    this.setItem('orderId', value);
  }
  private setOrders(orders: Order[]) {
    this.setItem("order", JSON.stringify(orders));
  }
}
