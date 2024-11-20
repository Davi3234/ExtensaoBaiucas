import { Order } from './../service/order/order';
import { Observable } from "rxjs";
import { Result } from "../@types/http";
import { Message } from "../@types/message";

export interface IOrderService{
  listar(): Observable<Result<Order[]>>;
  criar(order: Order): Observable<Result<Order>>;
  editar(order: Order): Observable<Result<Order>>;
  excluir(id: number): Observable<Result<Message[]>>;
  buscarPorId(id: number): Observable<Result<{order:Order}>>;
}
