import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from '../../environments/environment';
import { Result } from '../../@types/http'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = `${environment.API_BASE_URL}:80/users`;


  constructor(
    private readonly http: HttpClient
  ) { }

  listar(): Observable<Result<User[]>> {
    return this.http.get<Result<User[]>>(this.API);
  }

  criar(user: User): Observable<Result<User>> {
    const url = `${this.API}/create`
    return this.http.post<Result<User>>(url, user)
  }

  editar(user: User): Observable<Result<User>> {
    const url = `${this.API}/edit/${user.id}`
    return this.http.put<Result<User>>(url, user )
  }

  excluir(id: number): Observable<Result<User>> {
    const url = `${this.API}/delete/${id}`
    return this.http.delete<Result<User>>(url)
  }

  buscarPorId(id: number): Observable<Result<User>> {
    const url = `${this.API}/${id}`
    return this.http.get<Result<User>>(url)
  }

}
