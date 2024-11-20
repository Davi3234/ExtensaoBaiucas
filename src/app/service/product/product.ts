import { Categoria } from "../category/category";

export interface Produto {
  id?: number,
  name: string,
  description: string,
  value: number,
  category?: Categoria,
  ativo: boolean
  data_inclusao: Date
}
