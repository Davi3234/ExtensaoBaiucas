import { getId } from '../utils';
import { Product } from './../../service/product/product';
import { MockStorage } from './mock.storage';

export class ProductMockStorage extends MockStorage {
  constructor() {
    super();
    if (!this.getItem("product")) {
      this.setItem("product", JSON.stringify([]));
    }
  }

  save(product: Product) {
    const products = this.getProducts();
    product.id = this.getProductNextId();
    products.push(product);
    this.setProducts(products);
  }

  remove(productId: number) {
    const products = this.getProducts().filter((u) => u.id !== productId);
    this.setProducts(products);
  }

  edit(product: Product) {
    const products = this.getProducts().map((u) => (u.id == product.id ? product : u));
    this.setProducts(products);
  }

  find(productId: number): Product | undefined {
    return this.getProducts().find((u) => u.id == productId);
  }

  getProducts(): Product[] {
    return JSON.parse(this.getItem("product") || "[]");
  }

  getProductNextId(): number {
    return getId('productId');
  }
  setProductId(value: number): void {
    this.setItem('productId', value);
  }
  private setProducts(products: Product[]) {
    this.setItem("product", JSON.stringify(products));
  }
}
