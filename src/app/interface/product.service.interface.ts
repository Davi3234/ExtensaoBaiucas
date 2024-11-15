import { Product } from './../service/product/product';
import { Observable } from "rxjs";
import { Result } from "../@types/http";
import { Message } from "../@types/message";

export interface IProductService{
  listar(): Observable<Result<Product[]>>;
  criar(product: Product): Observable<Result<Product>>;
  editar(product: Product): Observable<Result<Product>>;
  excluir(id: number): Observable<Result<Message[]>>;
  buscarPorId(id: number): Observable<Result<{product:Product}>>;
}
