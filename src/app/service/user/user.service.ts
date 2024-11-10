import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from '../../environments/environment';
import { Result } from '../request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static readonly BASE_ENDPOINT_API = `${environment.API_BASE_URL}/users`;

  constructor(
    private readonly http: HttpClient
  ) { }

  listar(): Observable<Result<User[]>> {
    return this.http.get<Result<User[]>>(UserService.BASE_ENDPOINT_API);
  }

  criar(user: User): Observable<Result<User>> {
    return this.http.post<Result<User>>(UserService.BASE_ENDPOINT_API, user)
  }

  editar(user: User): Observable<Result<User>> {
    const url = `${UserService.BASE_ENDPOINT_API}/${user.id}`
    return this.http.put<Result<User>>(url, user)
  }

  excluir(id: number): Observable<Result<User>> {
    const url = `${UserService.BASE_ENDPOINT_API}/${id}`
    return this.http.delete<Result<User>>(url)
  }

  buscarPorId(id: number): Observable<Result<User>> {
    const url = `${UserService.BASE_ENDPOINT_API}/${id}`
    return this.http.get<Result<User>>(url)
  }

}
