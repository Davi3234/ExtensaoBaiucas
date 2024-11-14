export const ofPadrao = {
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
