import { IOrderService } from './../../interface/order.service.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './order';
import { environment } from '../../environments/environment';
import { Result } from '../../@types/http'
import { Message } from '../../@types/message';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements IOrderService {

  private readonly API = `${environment.API_BASE_URL}:80/orders`;

  constructor(
    private readonly http: HttpClient
  ) { }

  listar(): Observable<Result<Order[]>> {
    return this.http.get<Result<Order[]>>(this.API);
  }

  criar(order: Order): Observable<Result<Order>> {
    const url = `${this.API}`
    return this.http.post<Result<Order>>(url, order)
  }

  editar(order: Order): Observable<Result<Order>> {
    const url = `${this.API}/${order.id}`
    return this.http.put<Result<Order>>(url, order)
  }

  excluir(id: number): Observable<Result<Message[]>> {
    const url = `${this.API}/${id}`
    return this.http.delete<Result<Message[]>>(url)
  }

  buscarPorId(id: number): Observable<Result<{ order: Order }>> {
    const url = `${this.API}/${id}`
    return this.http.get<Result<{ order: Order }>>(url)
  }
}
