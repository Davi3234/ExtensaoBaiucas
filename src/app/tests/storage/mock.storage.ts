export class MockStorage implements Storage {
  protected localStorage = localStorage;

  setItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  getItem<T = any>(keyName: string) {
    return localStorage.getItem(keyName) as T;
  }

  clear() {
    this.localStorage.clear();
  }

  removeItem(keyName: string) {
    this.localStorage.removeItem(keyName);
  }

  key(indexItem: number) {
    return this.localStorage.key(indexItem);
  }

  public get length() {
    return this.localStorage.length;
  }
}
