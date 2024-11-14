import { Observable } from "rxjs";
import { Result } from "../@types/http";

export interface IAuthService{
  login(data: { login: string, password: string }): Observable<Result<{ token: string }>>;
  logout(): void;
  isAuthenticated(): boolean;
  saveToken(token: string): void;
  getAuthorizationToken(): string;
}
