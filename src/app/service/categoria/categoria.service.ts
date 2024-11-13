import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from './categoria';
import { environment } from '../../environments/environment';
import { Result } from '../../@types/http'
import { Message } from '../../@types/message';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private readonly API = `${environment.API_BASE_URL}:80/products`;


  constructor(
    private readonly http: HttpClient
  ) { }

  listar(): Observable<Result<Categoria[]>> {
    return this.http.get<Result<Categoria[]>>(this.API);
  }

  criar(categoria: Categoria): Observable<Result<Categoria>> {
    const url = `${this.API}/create`
    return this.http.post<Result<Categoria>>(url, categoria)
  }

  editar(categoria: Categoria): Observable<Result<Categoria>> {
    const url = `${this.API}/edit/${categoria.id}`
    return this.http.put<Result<Categoria>>(url, categoria )
  }

  excluir(id: number): Observable<Result<Message[]>> {
    const url = `${this.API}/${id}`
    return this.http.delete<Result<Message[]>>(url)
  }

  buscarPorId(id: number): Observable<Result<{categoria:Categoria}>> {
    const url = `${this.API}/${id}`
    return this.http.get<Result<{categoria:Categoria}>>(url)
  }
}
