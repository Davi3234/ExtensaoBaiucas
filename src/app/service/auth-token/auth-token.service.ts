import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  private static readonly TOKEN_KEY_STORAGE = 'authorization-token'

  saveToken(token: string) {
    localStorage.setItem(AuthTokenService.TOKEN_KEY_STORAGE, token);
  }

  removeToken() {
    localStorage.removeItem(AuthTokenService.TOKEN_KEY_STORAGE);
  }

  hasToken() {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem(AuthTokenService.TOKEN_KEY_STORAGE) ?? '';
  }
}
