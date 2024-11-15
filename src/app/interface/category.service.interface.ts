import { Category } from './../service/category/category';
import { Observable } from "rxjs";
import { Result } from "../@types/http";
import { Message } from "../@types/message";

export interface ICategoryService{
  listar(): Observable<Result<Category[]>>;
  criar(category: Category): Observable<Result<Category>>;
  editar(category: Category): Observable<Result<Category>>;
  excluir(id: number): Observable<Result<Message[]>>;
  buscarPorId(id: number): Observable<Result<{category:Category}>>;
}
