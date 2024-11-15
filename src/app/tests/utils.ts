export class MockStorage implements Storage {
  private static storage: { [x: string]: any } = {}

  get length() {
    return Object.keys(MockStorage.storage).length
  }

  setItem(key: string, value: any) {
    MockStorage.storage[key] = value
  }

  getItem<T = any>(keyName: string) {
    return MockStorage.storage[keyName] as T
  }

  clear() {
    MockStorage.storage = {}
  }

  removeItem(keyName: string) {
    if (MockStorage.storage[keyName])
      delete MockStorage.storage[keyName]
  }

  key(indexItem: number) {
    return Object.keys(MockStorage.storage)[indexItem]
  }
}

export function getUserNextId(): number {
  return getId('user');
}
export function setUserId(value: number): void {
  setId('user', value);
}

export const ofDefault = {
  error: null,
  ok: true,
  status: 200,
};

export function getId(model: string): number {
  setId(model, parseInt('' + localStorage.getItem(model)) + 1 || 1);
  return parseInt('' + localStorage.getItem(model));
}
export function setId(model: string, value: number): void {
  return localStorage.setItem(model, '' + value);
}
