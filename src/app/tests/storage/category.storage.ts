import { getId } from '../utils';
import { Category } from './../../service/category/category';
import { MockStorage } from './mock.storage';

export class CategoryMockStorage extends MockStorage {
  constructor() {
    super();
    if (!this.getItem("category")) {
      this.setItem("category", JSON.stringify([]));
    }
  }

  save(category: Category) {
    const categories = this.getCategories();
    category.id = this.getCategoryNextId();
    categories.push(category);
    this.setCategories(categories);
  }

  remove(categoryId: number) {
    const categories = this.getCategories().filter((u) => u.id !== categoryId);
    this.setCategories(categories);
  }

  edit(category: Category) {
    const categories = this.getCategories().map((u) => (u.id === category.id ? category : u));
    this.setCategories(categories);
  }

  find(categoryId: number): Category | undefined {
    return this.getCategories().find((u) => u.id === categoryId);
  }

  getCategories(): Category[] {
    return JSON.parse(this.getItem("category") || "[]");
  }

  getCategoryNextId(): number {
    return getId('categoryId');
  }
  setCategoryId(value: number): void {
    this.setItem('categoryId', value);
  }
  private setCategories(categories: Category[]) {
    this.setItem("category", JSON.stringify(categories));
  }
}
