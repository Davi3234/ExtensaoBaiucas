import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';
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

  listar(): Observable<Result<Product[]>> {
    return this.http.get<Result<Product[]>>(this.API);
  }

  criar(product: Product): Observable<Result<Product>> {
    const url = `${this.API}/create`
    return this.http.post<Result<Product>>(url, product)
  }

  editar(product: Product): Observable<Result<Product>> {
    const url = `${this.API}/edit/${product.id}`
    return this.http.put<Result<Product>>(url, product )
  }

  excluir(id: number): Observable<Result<Message[]>> {
    const url = `${this.API}/${id}`
    return this.http.delete<Result<Message[]>>(url)
  }

  buscarPorId(id: number): Observable<Result<{product:Product}>> {
    const url = `${this.API}/${id}`
    return this.http.get<Result<{product:Product}>>(url)
  }
}
