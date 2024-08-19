import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Formulario } from './form';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private readonly API = 'http://localhost:3000/formularios'

  constructor(private http: HttpClient) { }

  buscarPorId(id: number): Observable<Formulario> {
    const url = `${this.API}/${id}`
    return this.http.get<Formulario>(url)
  }

}
