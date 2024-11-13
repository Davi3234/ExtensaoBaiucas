import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './produto';
import { environment } from '../../environments/environment';
import { Result } from '../../@types/http'
import { Message } from '../../@types/message';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = `${environment.API_BASE_URL}:80/products`;


  constructor(
    private readonly http: HttpClient
  ) { }

  listar(): Observable<Result<Produto[]>> {
    return this.http.get<Result<Produto[]>>(this.API);
  }

  criar(produto: Produto): Observable<Result<Produto>> {
    const url = `${this.API}/create`
    return this.http.post<Result<Produto>>(url, produto)
  }

  editar(produto: Produto): Observable<Result<Produto>> {
    const url = `${this.API}/edit/${produto.id}`
    return this.http.put<Result<Produto>>(url, produto )
  }

  excluir(id: number): Observable<Result<Message[]>> {
    const url = `${this.API}/${id}`
    return this.http.delete<Result<Message[]>>(url)
  }

  buscarPorId(id: number): Observable<Result<{produto:Produto}>> {
    const url = `${this.API}/${id}`
    return this.http.get<Result<{produto:Produto}>>(url)
  }
}
