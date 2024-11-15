import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { Result } from '../../@types/http'
import { IAuthService } from '../../interface/auth.service.interface'
import { ofDefault } from '../utils';
import { AuthService } from '../../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthMockService extends AuthService implements IAuthService {

  override login(data: { login: string, password: string }): Observable<Result<{ token: string }>> {
    return of({
      ...ofDefault,
      value: { token: 'tokenLiberado' }
    });
  }
}
