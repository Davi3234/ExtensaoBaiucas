import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from './category';
import { environment } from '../../environments/environment';
import { Result } from '../../@types/http'
import { Message } from '../../@types/message';
import { ICategoryService } from '../../interface/category.service.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements ICategoryService{

  private readonly API = `${environment.API_BASE_URL}:80/categories`;


  constructor(
    private readonly http: HttpClient
  ) { }

  listar(): Observable<Result<Category[]>> {
    return this.http.get<Result<Category[]>>(this.API);
  }

  criar(category: Category): Observable<Result<Category>> {
    const url = `${this.API}/create`
    return this.http.post<Result<Category>>(url, category)
  }

  editar(category: Category): Observable<Result<Category>> {
    const url = `${this.API}/edit/${category.id}`
    return this.http.put<Result<Category>>(url, category )
  }

  excluir(id: number): Observable<Result<Message[]>> {
    const url = `${this.API}/${id}`
    return this.http.delete<Result<Message[]>>(url)
  }

  buscarPorId(id: number): Observable<Result<{category:Category}>> {
    const url = `${this.API}/${id}`
    return this.http.get<Result<{category:Category}>>(url)
  }
}
