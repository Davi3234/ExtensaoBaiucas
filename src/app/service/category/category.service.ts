import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from './category';
import { environment } from '../../environments/environment';
import { Result } from '../../@types/http'
import { Message } from '../../@types/message';
import { ICategoryService } from '../../interface/category.service.interface';
import { Produto } from '../product/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements ICategoryService{

  private readonly API = `${environment.API_BASE_URL}:80/categories`;


  constructor(
    private readonly http: HttpClient
  ) { }

  listar(): Observable<Result<Categoria[]>> {
    return this.http.get<Result<Categoria[]>>(this.API);
  }

  listarCategoriaProduto(): Observable<Result<{categorias: {category:Categoria, products: Produto[]}[]}>> {
    const url = `${this.API}/products`
    return this.http.get<Result<{categorias: {category:Categoria, products: Produto[]}[]}>>(url);
  }

  criar(category: Categoria): Observable<Result<Categoria>> {
    const url = `${this.API}`
    return this.http.post<Result<Categoria>>(url, category)
  }

  editar(category: Categoria): Observable<Result<Categoria>> {
    const url = `${this.API}/${category.id}`
    return this.http.put<Result<Categoria>>(url, category )
  }

  excluir(id: number): Observable<Result<Message[]>> {
    const url = `${this.API}/${id}`
    return this.http.delete<Result<Message[]>>(url)
  }

  buscarPorId(id: number): Observable<Result<{category:Categoria}>> {
    const url = `${this.API}/${id}`
    return this.http.get<Result<{category:Categoria}>>(url)
  }
}
