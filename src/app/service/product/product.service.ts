import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './product';
import { environment } from '../../environments/environment';
import { Result } from '../../@types/http'
import { Message } from '../../@types/message';
import { IProductService } from '../../interface/product.service.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements IProductService{

  private readonly API = `${environment.API_BASE_URL}:80/products`;

  constructor(
    private readonly http: HttpClient
  ) { }

  listar(): Observable<Result<Produto[]>> {
    return this.http.get<Result<Produto[]>>(this.API);
  }

  criar(product: Produto): Observable<Result<Produto>> {
    const url = `${this.API}`
    return this.http.post<Result<Produto>>(url, product)
  }

  editar(product: Produto): Observable<Result<Produto>> {
    const url = `${this.API}/${product.id}`
    return this.http.put<Result<Produto>>(url, product )
  }

  excluir(id: number): Observable<Result<Message[]>> {
    const url = `${this.API}/${id}`
    return this.http.delete<Result<Message[]>>(url)
  }

  buscarPorId(id: number): Observable<Result<{product:Produto}>> {
    const url = `${this.API}/${id}`
    return this.http.get<Result<{product:Produto}>>(url)
  }
}
