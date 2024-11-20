import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './user';
import { environment } from '../../environments/environment';
import { Result } from '../../@types/http'
import { Message } from '../../@types/message';
import { IUserService } from '../../interface/user.service.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService implements IUserService{

  private readonly API = `${environment.API_BASE_URL}:80/users`;


  constructor(
    private readonly http: HttpClient
  ) { }

  listar(): Observable<Result<Usuario[]>> {
    return this.http.get<Result<Usuario[]>>(this.API);
  }

  criar(user: Usuario): Observable<Result<Usuario>> {
    const url = `${this.API}/create`
    return this.http.post<Result<Usuario>>(url, user)
  }

  editar(user: Usuario): Observable<Result<Usuario>> {
    const url = `${this.API}/edit/${user.id}`
    return this.http.put<Result<Usuario>>(url, user )
  }

  excluir(id: number): Observable<Result<Message[]>> {
    const url = `${this.API}/${id}`
    return this.http.delete<Result<Message[]>>(url)
  }

  buscarPorId(id: number): Observable<Result<{user:Usuario}>> {
    const url = `${this.API}/${id}`
    return this.http.get<Result<{user:Usuario}>>(url)
  }

}
