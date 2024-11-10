import { HttpClient } from '@angular/common/http'
import { AuthTokenService } from './../auth-token/auth-token.service'
import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { catchError, map, Observable, of } from 'rxjs'
import { Result } from '../../@types/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static readonly BASE_ENDPOINT_API = `${environment.API_BASE_URL}/auth`

  constructor(
    private readonly authTokenService: AuthTokenService,
    private readonly http: HttpClient
  ) { }

  login(data: { login: string, password: string }): Observable<boolean> {
    return this.http.post<Result<{ token: string }>>(`${AuthService.BASE_ENDPOINT_API}/login`, data)
      .pipe(
        map(response => {
          this.authTokenService.saveToken(response.value.token)
          return true;
        }),
        catchError(error => {
          console.log(error);
          return of(false);
        })
      )
  }

  logout() {
    this.authTokenService.removeToken()
  }

  isAuthenticated() {
    return this.authTokenService.hasToken()
  }

  getAuthorizationToken() {
    return this.authTokenService.getToken()
    // return 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwibG9naW4iOiJkYXZpQGdtYWlsIiwibmFtZSI6IkRhdmkiLCJleHAiOjE3MzEzMzIzOTYsImlhdCI6MTczMTI0NTk5Nn0.Y2CX7C788t8dYU3xLfMuXLbsaxThJFfHq629QBQApg4'
  }
}
