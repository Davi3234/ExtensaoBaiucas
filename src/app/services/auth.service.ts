import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private readonly API = 'http://localhost:8000/auth/login'

  logar() {
    // let params = new HttpParams().set('login', login).set('password', password);
  }
}
