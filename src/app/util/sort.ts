export const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export function sort<T>(countries: T[], column: keyof T, direction: string): T[] {
  if (direction === '' || column === '')
    return countries;

  return [...countries].sort((a, b) => {
    const res = compare(a[column] as any, b[column] as any);

    return direction === 'asc' ? res : -res;
  });
}
