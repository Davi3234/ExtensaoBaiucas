import { UserMockStorage } from './../storage/user.storage';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Usuario } from '../../service/user/user';
import { Result } from '../../@types/http'
import { Message } from '../../@types/message';
import { IUserService } from '../../interface/user.service.interface';
import { ofDefault } from '../utils';
import { USER_MOCK_STORAGE } from '../mocks.manager.injection';

@Injectable({
  providedIn: 'root'
})
export class UserMockService implements IUserService {

  constructor(
    @Inject(USER_MOCK_STORAGE) private readonly userMockStorage: UserMockStorage
  ) { }

  listar(): Observable<Result<Usuario[]>> {
    return of({
      ...ofDefault,
      value: this.userMockStorage.getUsers()
    });
  }

  criar(user: Usuario): Observable<Result<Usuario>> {

    this.userMockStorage.save(user);

    return of({
      ...ofDefault,
      value: user
    });
  }

  editar(user: Usuario): Observable<Result<Usuario>> {
    this.userMockStorage.edit(user);

    return of({
      ...ofDefault,
      value: user
    });
  }

  excluir(id: number): Observable<Result<Message[]>> {
    this.userMockStorage.remove(id);

    return of({
      ...ofDefault,
      value: [{ message: "Usuário excluído com sucesso" }]
    });
  }

  buscarPorId(id: number): Observable<Result<{ user: Usuario }>> {
    let userReturn = this.userMockStorage.find(id);

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
