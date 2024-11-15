import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../service/user/user';
import { Result } from '../../@types/http'
import { Message } from '../../@types/message';
import { IUserService } from '../../interface/user.service.interface';
import { getUserNextId, ofDefault } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class UserMockService implements IUserService {

  private listaUser: User[] = [
    {
      id: getUserNextId(),
      name: 'Davi',
      login: 'davi@gmail.com',
      active: true
    },
    {
      id: getUserNextId(),
      name: 'Danrley',
      login: 'danrley@gmail.com',
      active: true
    },
    {
      id: getUserNextId(),
      name: 'Daiane',
      login: 'daiane@gmail.com',
      active: true
    },
  ];

  listar(): Observable<Result<User[]>> {
    return of({
      ...ofDefault,
      value: this.listaUser
    });
  }

  criar(user: User): Observable<Result<User>> {
    user.id = getUserNextId();
    this.listaUser.push(user);
    return of({
      ...ofDefault,
      value: user
    });
  }

  editar(user: User): Observable<Result<User>> {
    const existingUser = this.listaUser.find(u => u.id === user.id);

    if (existingUser) {
      Object.assign(existingUser, user);
      return of({
        ...ofDefault,
        value: existingUser
      });
    }

    return of({
      error: {
        message: 'Usuário não encontrado',
        causes: [
          {
            message: 'Usuário não encontrado',
            origin: [
              'login'
            ]
          }
        ]
      },
      ok: false,
      status: 404,
      value: { id: 0, name: '', login: '', active: false }
    });
  }


  excluir(id: number): Observable<Result<Message[]>> {
    return new Observable();
  }

  buscarPorId(id: number): Observable<Result<{ user: User }>> {
    let userReturn = this.listaUser.find(function (element) {
      return element.id == id;
    });

    if (!userReturn) {
      return of({
        error: {
          message: 'Usuário não encontrado',
          causes: [
            {
              message: 'Usuário não encontrado',
              origin: [
                'login'
              ]
            }
          ]
        },
        ok: false,
        status: 404,
        value: { user: { id: 0, name: '', login: '', active: false } }
      });
    }

    return of({
      ...ofDefault,
      value: { user: userReturn }
    });
  }
}
