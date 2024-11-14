export class MockStorage implements Storage {
  private static storage: { [x: string]: any } = {}

  setItem(key: string, value: any) {
    MockStorage.storage[key] = value
  }

  getItem(keyName: string) {
    return MockStorage.storage[keyName]
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

  public get length() {
    return Object.keys(MockStorage.storage).length
  }
}

export function getUserNextId(): number {
  return getId('user');
}
export function setUserId(value: number): void {
  setId('user', value);
}

export const ofPadrao = {
  error: null,
  ok: true,
  status: 200,
};

function getId(model: string): number {
  setId(model, (parseInt("" + localStorage.getItem(model)) + 1) || 1);
  return parseInt('' + localStorage.getItem(model));
}
function setId(model: string, value: number): void {
  return localStorage.setItem(model, '' + value);
}
