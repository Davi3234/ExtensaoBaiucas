import { Observable } from "rxjs";
import { Result } from "../@types/http";
import { User } from "../service/user/user";
import { Message } from "../@types/message";

export interface IUserService{
  listar(): Observable<Result<User[]>>;
  criar(user: User): Observable<Result<User>>;
  editar(user: User): Observable<Result<User>>;
  excluir(id: number): Observable<Result<Message[]>>;
  buscarPorId(id: number): Observable<Result<{user:User}>>;
}
