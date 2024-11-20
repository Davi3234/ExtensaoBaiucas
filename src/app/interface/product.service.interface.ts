import { Produto } from './../service/product/product';
import { Observable } from "rxjs";
import { Result } from "../@types/http";
import { Message } from "../@types/message";

export interface IProductService{
  listar(): Observable<Result<Produto[]>>;
  criar(product: Produto): Observable<Result<Produto>>;
  editar(product: Produto): Observable<Result<Produto>>;
  excluir(id: number): Observable<Result<Message[]>>;
  buscarPorId(id: number): Observable<Result<{product:Produto}>>;
}
