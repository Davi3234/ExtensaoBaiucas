import { getId } from '../utils';
import { Produto } from './../../service/product/product';
import { MockStorage } from './mock.storage';

export class ProductMockStorage extends MockStorage {
  constructor() {
    super();
    if (!this.getItem("product")) {
      this.setItem("product", JSON.stringify([]));
    }
  }

  save(product: Produto) {
    const products = this.getProducts();
    product.id = this.getProductNextId();
    products.push(product);
    this.setProducts(products);
  }

  remove(productId: number) {
    const products = this.getProducts().filter((u) => u.id != productId);
    this.setProducts(products);
  }

  edit(product: Produto) {
    const products = this.getProducts().map((u) => (u.id == product.id ? product : u));
    this.setProducts(products);
  }

  find(productId: number): Produto | undefined {
    return this.getProducts().find((u) => u.id == productId);
  }

  getProducts(): Produto[] {
    return JSON.parse(this.getItem("product") || "[]");
  }

  getProductsByCategory(categoryId?: number): Produto[] {
    return this.getProducts().filter((u) => u.category?.id == categoryId);
  }

  getProductNextId(): number {
    return getId('productId');
  }
  setProductId(value: number): void {
    this.setItem('productId', value);
  }
  private setProducts(products: Produto[]) {
    this.setItem("product", JSON.stringify(products));
  }
}
