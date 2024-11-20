import { Produto } from "../product/product"

export interface Item {
  product: Produto,
  price: number
  observation: string
}
