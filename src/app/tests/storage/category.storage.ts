import { Produto } from '../../service/product/product';
import { getId } from '../utils';
import { Categoria } from './../../service/category/category';
import { MockStorage } from './mock.storage';
import { ProductMockStorage } from './product.storage';

export class CategoryMockStorage extends MockStorage {
  constructor() {
    super();
    if (!this.getItem("category")) {
      this.setItem("category", JSON.stringify([]));
    }
  }

  save(category: Categoria) {
    const categories = this.getCategories();
    category.id = this.getCategoryNextId();
    categories.push(category);
    this.setCategories(categories);
  }

  remove(categoryId: number) {
    const categories = this.getCategories().filter((u) => u.id !== categoryId);
    this.setCategories(categories);
  }

  edit(category: Categoria) {
    const categories = this.getCategories().map((u) => (u.id == category.id ? category : u));
    this.setCategories(categories);
  }

  find(categoryId?: number): Categoria | undefined {
    return this.getCategories().find((u) => u.id == categoryId);
  }

  getCategories(): Categoria[] {
    return JSON.parse(this.getItem("category") || "[]");
  }

  getCategoriesProducts(): {category: Categoria, products?: Produto[]}[] {
    let categories = this.getCategories();
    let array: {category: Categoria, products?: Produto[]}[] = [];
    let productMock = new ProductMockStorage();

    categories.forEach(category => {
      array.push({
        category,
        products: [...productMock.getProductsByCategory(category.id)]
      })
    });

    return array;
  }

  getCategoryNextId(): number {
    return getId('categoryId');
  }
  setCategoryId(value: number): void {
    this.setItem('categoryId', value);
  }
  private setCategories(categories: Categoria[]) {
    this.setItem("category", JSON.stringify(categories));
  }
}
