import { Observable } from "rxjs";
import { Result } from "../@types/http";
import { Usuario } from "../service/user/user";
import { Message } from "../@types/message";

export interface IUserService {
  listar(): Observable<Result<Usuario[]>>;
  criar(user: Usuario): Observable<Result<Usuario>>;
  editar(user: Usuario): Observable<Result<Usuario>>;
  excluir(id: number): Observable<Result<Message[]>>;
  buscarPorId(id: number): Observable<Result<{ user: Usuario }>>;
  buscarUsuarioLogado(): Observable<Result<{ user: Usuario }>>;
}
