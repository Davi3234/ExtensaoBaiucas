export class MockStorage<T> implements Storage{
  constructor (protected object: T) {

  }

  clear(): void{

  }
  getItem(key: string): string | null{

  }
  key(index: number): string | null{

  }
  removeItem(): void{

  }
  setItem(value: string): void{
    localStorage.setItem(this.object, value);
  }

  protected gravar(object: T){

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
  setId(model, (parseInt(""+localStorage.getItem(model))+1) || 1);
  return parseInt('' + localStorage.getItem(model));
}
function setId(model: string, value: number): void {
  return localStorage.setItem(model, '' + value);
}
