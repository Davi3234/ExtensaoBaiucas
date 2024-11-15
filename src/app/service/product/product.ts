import { Category } from "../category/category";

export interface Product {
  id?: number,
  name: string,
  description: string,
  value: number,
  category: Category,
  ativo: boolean
  data_inclusao: Date
}
