import { HttpClient } from '@angular/common/http'
import { AuthTokenService } from './../auth-token/auth-token.service'
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs'
import { Result } from '../../@types/http'
import { IAuthService } from '../../interface/auth.service.interface'

@Injectable({
  providedIn: 'root'
})
export class AuthService implements IAuthService{

  private static readonly BASE_ENDPOINT_API = `${environment.API_BASE_URL}/auth`

  constructor(
    private readonly authTokenService: AuthTokenService,
    private readonly http: HttpClient
  ) { }

  login(data: { login: string, password: string }): Observable<Result<{ token: string }>> {
    return this.http.post<Result<{ token: string }>>(`${AuthService.BASE_ENDPOINT_API}/login`, data)
  }

  logout(): void {
    this.authTokenService.removeToken()
  }

  isAuthenticated(): boolean {
    return this.authTokenService.hasToken()
  }

  saveToken(token: string): void {
    this.authTokenService.saveToken(token)
  }

  getAuthorizationToken(): string {
    return this.authTokenService.getToken()
  }
}
