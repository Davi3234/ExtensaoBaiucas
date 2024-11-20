import { Categoria } from './../service/category/category';
import { Observable } from "rxjs";
import { Result } from "../@types/http";
import { Message } from "../@types/message";
import { Produto } from '../service/product/product';

export interface ICategoryService{
  listar(): Observable<Result<Categoria[]>>;
  criar(category: Categoria): Observable<Result<Categoria>>;
  editar(category: Categoria): Observable<Result<Categoria>>;
  excluir(id: number): Observable<Result<Message[]>>;
  buscarPorId(id: number): Observable<Result<{category:Categoria}>>;
  listarCategoriaProduto(): Observable<Result<{category:Categoria, products?: Produto[]}[]>>;
}
