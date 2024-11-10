import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from '../../environments/environment';
import { Request } from '../request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly API = `${environment.API_BASE_URL}:80/users`;


  constructor(
    private readonly http: HttpClient
  ) { }

  listar(): Observable<Request<User[]>> {
    return this.http.get<Request<User[]>>(this.API);
  }

  criar(user: User): Observable<Request<User>> {
    return this.http.post<Request<User>>(this.API, user)
  }

  editar(user: User): Observable<Request<User>> {
    const url = `${this.API}/${user.id}`
    return this.http.put<Request<User>>(url, user )
  }

  excluir(id: number): Observable<Request<User>> {
    const url = `${this.API}/${id}`
    return this.http.delete<Request<User>>(url)
  }

  buscarPorId(id: number): Observable<Request<User>> {
    const url = `${this.API}/${id}`
    return this.http.get<Request<User>>(url)
  }

}
